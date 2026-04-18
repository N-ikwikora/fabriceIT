import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // ✅ FIXED PATH

export default function RequestsBox() {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false); // ✅ FIXED

const fetchRequests = async () => {
  try {
    const res = await axios.get("http://localhost:5000/help-requests");
    console.log("DATA FROM API:", res.data); // 🔥 DEBUG
    setRequests(res.data);
  } catch (err) {
    console.log("❌ ERROR:", err.response?.data || err.message);
  }
};

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

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

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white p-6 pt-24">

        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
          Requests Dashboard
        </h1>

        <div className="max-w-6xl mx-auto">

          {requests.length === 0 ? (
            <p className="text-center text-gray-400">
              No help requests yet...
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {requests.map((r) => (
                <div
                  key={r.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition"
                >
                  <h2 className="text-xl font-bold text-blue-400 mb-2">
                    {r.name}
                  </h2>

                  <p className="text-sm text-gray-300">
                    📞 {r.phone}
                  </p>

                  <p className="text-sm text-gray-300">
                    📍 {r.location}
                  </p>

                  <p className="mt-3 text-gray-200">
                    {r.problem}
                  </p>

                <p className="text-xs text-gray-500 mt-3">
                 {r.created_at
                  ? new Date(r.created_at).toLocaleString()
                  : "No date"}
                   </p>
                </div>
              ))}

            </div>
          )}
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