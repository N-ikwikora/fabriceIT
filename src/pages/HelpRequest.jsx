import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // 

export default function HelpRequest() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    problem: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/help-request", form)
      .then((res) => {
        setMsg(res.data.message);
        setForm({ name: "", phone: "", location: "", problem: "" });
           
      })
      .catch(() => {
        setMsg("Something went wrong. Try again.");
      });
  };

  return (
    <>
    
      {/* HEADER */}
      <header className="w-full bg-gradient-to-r from-black via-slate-950 to-blue-950 border-b border-blue-900/40 text-white fixed top-0 left-0 z-50 shadow-lg">

        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/home" className="text-xl font-bold text-blue-400">
            CareFund
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-5">

            <SearchBar />

            <Link to="/home" className="hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
            <Link to="/mobileMoney" className="hover:text-blue-400">Donations</Link>
            <Link to="/help" className="hover:text-blue-400">Help</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>

            <Link to="/profile" className="px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-500">
              Profile
            </Link>

            <Link to="/login" className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700">
              Logout
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-blue-400"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-black/90 border-t border-blue-900">

            <SearchBar />

            <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/mobileMoney" onClick={() => setOpen(false)}>Donations</Link>
            <Link to="/help" onClick={() => setOpen(false)}>Help</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <Link to="/profile" className="text-blue-400" onClick={() => setOpen(false)}>
              Profile
            </Link>

            <Link to="/login" className="text-red-400" onClick={() => setOpen(false)}>
              Logout
            </Link>
          </div>
        )}
      </header>


    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white flex items-center justify-center px-4 ">

      {/* BACKGROUND GLOW EFFECT */}
      <div className="absolute w-72 h-72 bg-blue-600  rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-600  rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* CARD */}
      <div className="relative w-full max-w-2xl">

        <div className="bg-white/10 backdrop-blur-xl border  border-white/20 rounded-3xl shadow-2xl p-6 md:p-10">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-400">
            Request Help
          </h1>

          <p className="text-center text-gray-300 mt-3 mb-8">
            Fill in your details and our CareFund team will contact you as soon as possible.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-black/40 border border-blue-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 rounded-xl bg-black/40 border border-blue-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="w-full p-3 rounded-xl bg-black/40 border border-blue-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            <textarea
              name="problem"
              value={form.problem}
              onChange={handleChange}
              placeholder="Describe your problem..."
              rows="5"
              className="w-full p-3 rounded-xl bg-black/40 border border-blue-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              required
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-black
              bg-gradient-to-r from-blue-500 to-cyan-400
              hover:from-blue-600 hover:to-cyan-500 transition
              shadow-lg"
            >
              Submit Request
            </button>
          </form>

          {/* MESSAGE */}
          {msg && (
            <p className="text-center mt-5 text-yellow-300 font-medium">
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>

    {/* FOOTER */}
          <footer className="w-full bg-black/80 border-t border-blue-900/40 text-white mt-10">
    
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
    
              <p className="text-xs md:text-sm text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} CareFund. All rights reserved.
              </p>
    
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/about" className="hover:text-blue-400">About</Link>
                <Link to="/help" className="hover:text-blue-400">Help</Link>
                <Link to="/contact" className="hover:text-blue-400">Contact</Link>
              </div>
    
              <p className="text-xs text-gray-500 text-center md:text-right">
                Helping Humanity 💙
              </p>
    
            </div>
          </footer>
        </>
  );
}