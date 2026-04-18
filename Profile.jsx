import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/money.png";

export default function Profile() {
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
  const u = localStorage.getItem("user");
  setUser(u);

  if (!u) return;

  axios.get(`http://localhost:5000/profile/${u}`)
    .then((res) => {
      setBio(res.data.bio || "");
      setImage(res.data.image);
    });

  axios.get(`http://localhost:5000/posts/${u}`)
    .then((res) => setPosts(res.data));

}, []);
  
  const saveBio = () => {
    axios.post("http://localhost:5000/update-bio", {
      name: user,
      bio,
    });
  };
const uploadImage = (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
  formData.append("name", user);

  axios.post("http://localhost:5000/upload", formData)
    .then(() => {
      // 🔥 re-fetch profile from DB
      axios.get(`http://localhost:5000/profile/${user}`)
        .then(res => {
          setImage(res.data.image);
        });
    });
};
const post = () => {
  axios
    .post("http://localhost:5000/post", {
      name: user,
      content: newPost,
    })
    .then(() => {
      setNewPost("");

      // 🔥 reload posts from DB
      axios.get(`http://localhost:5000/posts/${user}`)
        .then(res => setPosts(res.data));
    });
};

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* NAVBAR */}
      <div className="w-full bg-white/20 backdrop-blur-md border-b border-white/30 p-3 flex flex-wrap justify-center gap-3 text-white">
        
        <Link to="/messaging">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:scale-105 transition">
            Chat
          </button>
        </Link>

        <Link to="/followers">
          <button className="px-4 py-2 bg-green-500 rounded-lg hover:scale-105 transition">
            Followers
          </button>
        </Link>

        <Link to="/home">
          <button className="px-4 py-2 bg-yellow-500 rounded-lg hover:scale-105 transition">
            Home
          </button>
        </Link>
      </div>

      {/* MAIN CARD */}
      <div className="flex-1 flex justify-center items-start p-4">
        <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">

          {/* PROFILE HEADER */}
          <div className="flex flex-col items-center text-center">
            <img
              src={
                image
                  ? `http://localhost:5000/uploads/${image}`
                  : "https://via.placeholder.com/150"
              }
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-500 shadow-md"
            />

            <input
              type="file"
              onChange={uploadImage}
              className="mt-3 text-sm"
            />

            <h2 className="text-2xl font-bold mt-3">{user}</h2>
          </div>

          {/* BIO */}
          <div className="mt-6">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your bio..."
              className="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            />

            <button
              onClick={saveBio}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >
              Save Bio
            </button>
          </div>

          {/* POST */}
          <div className="mt-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-24 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />

            <button
              onClick={post}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Post
            </button>
          </div>

          {/* POSTS */}
          <div className="mt-8 space-y-3">
            {posts.map((p, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800">{p.content}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}