import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/convention.png";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        name,
        password,
      })
      .then((res) => {
        setMsg(res.data.message);

        if (res.data.message === "login success") {
          localStorage.setItem("user", name);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("LOGIN ERROR:", err);
        setMsg("Server error");
      });
  };

  const handleRegister = () => {
    if (!name || !password) {
      alert("Fill all fields");
      return;
    }

    axios
      .post("http://localhost:5000/register", {
        name,
        password,
      })
      .then((res) => {
        setMsg(res.data.message);
      })
      .catch((err) => {
        console.log("REGISTER ERROR:", err);
        setMsg("Server error");
      });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl 
        bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl text-white">

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 transition p-2 rounded-lg font-semibold"
          >
            LOGIN
          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-green-500 hover:bg-green-600 transition p-2 rounded-lg font-semibold"
          >
            REGISTER
          </button>
        </div>

        {/* Message */}
        {msg && (
          <p className="text-center mt-4 text-sm text-yellow-300">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}