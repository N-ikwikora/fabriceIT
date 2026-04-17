const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const http = require("http");
const Stripe = require("stripe");
const axios = require("axios");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");



const stripe = Stripe("YOUR_STRIPE_SECRET_KEY");

const app = express();
const PORT = 5000;

const adminAuth = (req, res, next) => {
  const token = req.headers["admin-token"];

  if (token !== "ADMIN_SECRET_123") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

// ================= SERVER + SOCKET =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// online users
let users = {};

// ================= SOCKET =================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("addUser", (username) => {
    if (!username) return;
    users[username] = socket.id;

    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    const { sender, receiver, message } = data;

    const fullMessage = {
      sender,
      receiver,
      message,
      time: new Date(),
    };

    const receiverSocket = users[receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", fullMessage);
    }

    const senderSocket = users[sender];
    if (senderSocket) {
      io.to(senderSocket).emit("receiveMessage", fullMessage);
    }
  });

  socket.on("disconnect", () => {
    for (let user in users) {
      if (users[user] === socket.id) {
        delete users[user];
      }
    }

    io.emit("getUsers", users);
  });
});




// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const saltRounds = 10;

// ================= DB =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "banana",
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});
db.connect((err) => {
  if (err) throw err;
  console.log("DB connected");
});

const checkPageBlocked = (pageName) => {
  return (req, res, next) => {
    if (!pageName) return next();

    db.query(
      "SELECT is_blocked FROM page_controls WHERE page=?",
      [pageName],
      (err, result) => {
        if (err) return res.status(500).json(err);

        const is_blocked = result[0]?.is_blocked;

        if (Number(is_blocked) === 1) {
          return res.status(403).json({
            message: "This page is blocked",
          });
        }

        next();
      }
    );
  };
};
// ================= UPLOAD =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

app.post("/register", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query("SELECT * FROM users WHERE name=?", [name], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.json({ message: "User already exists" });
    }

    db.query(
      "INSERT INTO users(name,password) VALUES(?,?)",
      [name, password],
      (err2) => {
        if (err2) return res.status(500).json(err2);

        return res.json({ message: "account created" });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE name=? AND password=?",
    [name, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({ message: "login success" });
      } else {
        return res.json({ message: "wrong credentials" });
      }
    }
  );
});

// ================= PROFILE =================
app.get("/profile/:name", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE name=?",
    [req.params.name],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

app.post("/update-bio", (req, res) => {
  const { name, bio } = req.body;

  db.query(
    "UPDATE users SET bio=? WHERE name=?",
    [bio, name],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "bio updated" });
    }
  );
});

app.post("/upload", upload.single("image"), (req, res) => {
  const { name } = req.body;
  const image = req.file.filename;

  db.query(
    "UPDATE users SET image=? WHERE name=?",
    [image, name],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ image });
    }
  );
});

// ================= POSTS =================
app.post("/post", (req, res) => {
  const { name, content } = req.body;

  db.query("SELECT id FROM users WHERE name=?", [name], (err, result) => {
    if (err) return res.status(500).json(err);

    const user_id = result[0]?.id;
    if (!user_id) return res.status(400).json({ message: "user not found" });

    db.query(
      "INSERT INTO posts(user_id,content) VALUES(?,?)",
      [user_id, content],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "posted" });
      }
    );
  });
});

app.get("/posts/:name", (req, res) => {
  db.query(
    `SELECT posts.*, users.name 
     FROM posts JOIN users ON posts.user_id=users.id
     WHERE users.name=? ORDER BY posts.id DESC`,
    [req.params.name],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ================= FOLLOW =================
app.post("/follow", (req, res) => {
  const { follower, following } = req.body;

  db.query(
    "INSERT INTO followers(follower_id, following_id) VALUES((SELECT id FROM users WHERE name=?),(SELECT id FROM users WHERE name=?))",
    [follower, following],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "followed" });
    }
  );
});

// ================= MESSAGES =================

// SAVE MESSAGE
app.post("/send", (req, res) => {
  const { sender, receiver, message } = req.body;

  db.query(
    "INSERT INTO messages(sender,receiver,message) VALUES(?,?,?)",
    [sender, receiver, message],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "sent", id: result.insertId });
    }
  );
});

// GET CHAT MESSAGES
app.get("/messages/:user1/:user2", (req, res) => {
  const { user1, user2 } = req.params;

  db.query(
    `SELECT * FROM messages 
     WHERE (sender=? AND receiver=?) 
     OR (sender=? AND receiver=?)
     ORDER BY id ASC`,
    [user1, user2, user2, user1],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// ================= 🔥 CHAT PARTNERS (FIXED & CLEAN) =================
app.get("/chat-partners/:username", checkPageBlocked("chat"), (req, res) => {
  const user = req.params.username;

  const sql = `
    SELECT DISTINCT other_user FROM (
      SELECT receiver AS other_user FROM messages WHERE sender=?
      UNION
      SELECT sender AS other_user FROM messages WHERE receiver=?
    ) AS t
  `;

  db.query(sql, [user, user], (err, result) => {
    if (err) return res.status(500).json(err);

    const partners = result.map((r) => r.other_user);
    res.json(partners);
  });
});
// ================= SEARCH =================
app.get("/search", checkPageBlocked("search"), (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const sql = `
    SELECT 'user' AS type, id, name, bio, image FROM users WHERE name LIKE ?
    UNION
    SELECT 'post' AS type, posts.id, users.name, posts.content AS bio, NULL AS image
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.content LIKE ?
  `;

  db.query(sql, [`%${q}%`, `%${q}%`], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
// ================= HELP REQUEST =================
app.post("/help-request", (req, res) => {
  const { name, phone, location, problem } = req.body;

  db.query(
    "INSERT INTO help_requests (name, phone, location, problem) VALUES (?, ?, ?, ?)",
    [name, phone, location, problem],
    (err) => {
      if (err) return res.json({ message: "Failed" });
      res.json({ message: "Success" });
    }
  );
});
app.get("/help-requests", (req, res) => {
  db.query(
    "SELECT * FROM help_requests ORDER BY id DESC",
    (err, result) => {
      if (err) {
        console.log("❌ DB ERROR:", err);
        return res.status(500).json({ message: "Server error" });
      }

      console.log("✅ DATA:", result); // debug
      res.json(result);
    }
  );
});
// ================= GET ALL USERS =================
app.get("/users", (req, res) => {
  db.query(
    "SELECT id, name, bio, image FROM users ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


// ================= SEARCH USERS ONLY =================
app.get("/search-users", (req, res) => {
  const q = req.query.q;

  if (!q) return res.json([]);

  db.query(
    "SELECT id, name, bio, image FROM users WHERE name LIKE ? LIMIT 10",
    [`%${q}%`],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});
// ================= VIDEOS UPLOAD =================
app.post("/upload-video", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title } = req.body;
    const filename = req.file.filename;

    db.query(
      "INSERT INTO videos (title, filename) VALUES (?, ?)",
      [title, filename],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "DB error" });
        }

        res.json({ message: "Video uploaded successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
});


// ================= GET VIDEOS =================
app.get("/videos", checkPageBlocked("videos"), (req, res) => {
  db.query(
    "SELECT * FROM videos ORDER BY created_at DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result || []);
    }
  );
});



let memory = {}; // learning system

app.post("/sunai", async (req, res) => {
  const msg = req.body.message.toLowerCase();

  console.log("USER:", msg);

  // 🧠 1. MEMORY (self learning)
  if (memory[msg]) {
    return res.json({ reply: memory[msg] });
  }

  // 📚 2. LOCAL BRAIN (instant intelligence)
  const brain = {
    "what is ai": "AI is Artificial Intelligence that simulates human thinking.",
    "what is nodejs": "Node.js is a JavaScript runtime built on Chrome V8 engine.",
    "what is react": "React is a JavaScript library for building UI.",
    "who are you": "I am SunAI Hybrid AI 🤖 built with Node.js.",
  };

  if (brain[msg]) {
    memory[msg] = brain[msg];
    return res.json({ reply: brain[msg] });
  }

  // 🌐 3. WIKIPEDIA SEARCH (REAL KNOWLEDGE)
  try {
    const wiki = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(msg)}`
    );

    if (wiki.data?.extract) {
      const reply = wiki.data.extract;

      memory[msg] = reply; // store knowledge (self learning)

      return res.json({ reply });
    }
  } catch (e) {
    console.log("Wiki failed");
  }

  // 🧠 4. SMART LOGIC ENGINE
  if (msg.includes("time")) {
    return res.json({
      reply: "Current time is " + new Date().toLocaleTimeString(),
    });
  }

  if (msg.includes("date")) {
    return res.json({
      reply: "Today is " + new Date().toDateString(),
    });
  }

  // ⚡ 5. FALLBACK INTELLIGENCE
  const fallback = [
    "I don't know that yet 🤔 but I will learn it.",
    "Interesting question, can you explain more?",
    "I couldn't find exact data, but I'm improving.",
  ];

  const reply =
    fallback[Math.floor(Math.random() * fallback.length)];

  res.json({ reply });
});



// LOG ACTIVITY
app.post("/admin/log", (req, res) => {
  const { user, page, action } = req.body;

  db.query(
    "INSERT INTO activity_logs(user,page,action) VALUES(?,?,?)",
    [user, page, action]
  );

  res.json({ message: "logged" });
});


app.post("/admin/block-page", adminAuth, (req, res) => {
  const { page, status } = req.body;

  db.query(
    "SELECT * FROM page_controls WHERE page=?",
    [page],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        // 👉 niba page itabaho → uyishyiremo
        db.query(
          "INSERT INTO page_controls (page, is_blocked) VALUES (?, ?)",
          [page, status],
          (err2) => {
            if (err2) return res.status(500).json(err2);
            res.json({ message: "Page created & blocked" });
          }
        );
      } else {
        // 👉 niba ihari → update
        db.query(
          "UPDATE page_controls SET is_blocked=? WHERE page=?",
          [status, page],
          (err3) => {
            if (err3) return res.status(500).json(err3);
            res.json({ message: "Page updated" });
          }
        );
      }
    }
  );
});
app.post("/admin/set-limit", adminAuth, (req, res) => {
  const { page, time_limit } = req.body;

  db.query(
    "SELECT * FROM page_controls WHERE page=?",
    [page],
    (err, result) => {
      if (result.length === 0) {
        db.query(
          "INSERT INTO page_controls (page, time_limit) VALUES (?, ?)",
          [page, time_limit],
          () => res.json({ message: "Limit created" })
        );
      } else {
        db.query(
          "UPDATE page_controls SET time_limit=? WHERE page=?",
          [time_limit, page],
          () => res.json({ message: "Limit updated" })
        );
      }
    }
  );
});

app.get("/page-status/:page", (req, res) => {
  db.query(
    "SELECT * FROM page_controls WHERE page=?",
    [req.params.page],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0] || {});
    }
  );
});


// ================= START SERVER =================
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);