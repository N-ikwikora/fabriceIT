import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});

  const currentUser = localStorage.getItem("user");

  // REGISTER USER FOR ONLINE STATUS
  useEffect(() => {
    if (currentUser) {
      socket.emit("addUser", currentUser);
    }

    socket.on("getUsers", (data) => {
      setOnlineUsers(data);
    });

    return () => socket.off("getUsers");
  }, [currentUser]);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  // FILTER
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // OPEN CHAT DIRECTLY
  const openChat = (name) => {
    localStorage.setItem("chatUser", name);
    window.location.href = "/messaging";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          👥 All Users
        </h1>
        <p className="text-gray-600">
          Reba abantu bose bakoze account
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Search user..."
          className="w-full p-3 rounded-xl border shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS GRID */}
      <div className="max-w-5xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {filteredUsers.map((user, i) => {
          const isOnline = onlineUsers[user.name];

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 text-center relative"
            >

              {/* 🟢 ONLINE DOT */}
              {isOnline && (
                <span className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}

              {/* PROFILE IMAGE */}
              <img
                src={
                  user.image
                    ? `http://localhost:5000/uploads/${user.image}`
                    : "https://via.placeholder.com/100"
                }
                alt="profile"
                className="w-20 h-20 mx-auto rounded-full object-cover mb-3 border"
              />

              {/* NAME */}
              <h2 className="font-semibold text-lg text-gray-800">
                {user.name}
              </h2>

              {/* BIO */}
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {user.bio || "No bio"}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3 justify-center">

                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
                  onClick={() =>
                    window.location.href = `/profile/${user.name}`
                  }
                >
                  Profile
                </button>

                <button
                  className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                  onClick={() => openChat(user.name)}
                >
                  Chat 💬
                </button>

              </div>
            </div>
          );
        })}

      </div>

      {/* EMPTY */}
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No users found 😢
        </p>
      )}
    </div>
  );
}