import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
export default function SidebarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full flex items-center justify-between px-4 py-3 bg-black/80 text-white fixed top-0 left-0 z-50 shadow">

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="text-2xl text-blue-400"
        >
          ☰
        </button>
         {/* Search */}
            <div className="w-full md:w-auto">
              <SearchBar />
            </div>
          
              <Link to="/about">
                <button className="px-4 py-2 rounded-lg bg-yellow-400/80 hover:bg-yellow-500 text-black font-semibold">
                  About
                </button>
              </Link>

              <Link to="/mobileMoney">
                <button className="px-4 py-2 rounded-lg bg-yellow-400/80 hover:bg-yellow-500 text-black font-semibold">
                  Donations
                </button>
              </Link>

              <Link to="/contact">
                <button className="px-4 py-2 rounded-lg bg-red-400/80 hover:bg-red-500 font-semibold">
                  Contact
                </button>
              </Link>

                 <Link to="/help">
                    <button className="px-4 py-2 rounded-lg bg-pink-400/80 hover:bg-pink-500 font-semibold">
                Help
              </button>
                 </Link>
           

              <Link to="/profile">
                <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold">
                  Profile
                </button>
              </Link>

        {/* LOGO */}
        <h1 className="font-bold text-blue-400">
          CareFund
        </h1>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* SIDEBAR */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-black via-slate-900 to-blue-950 text-white z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}>

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-blue-400">
            Menu
          </h2>

          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col gap-3 p-4 text-sm">

          <Link to="/home" onClick={() => setOpen(false)} className="hover:text-blue-400">
            🏠 Home
          </Link>

          <Link to="/profile" onClick={() => setOpen(false)} className="hover:text-blue-400">
            👤 Profile
          </Link>

          <Link to="/RequestBox" onClick={() => setOpen(false)} className="hover:text-blue-400">
            📦 Requests
          </Link>

          <Link to="/VideoPage" onClick={() => setOpen(false)} className="hover:text-blue-400">
            🎬 Videos
          </Link>

          <Link to="/MobileMoney" onClick={() => setOpen(false)} className="hover:text-blue-400">
            💰 Payments
          </Link>

          <Link to="/followers" onClick={() => setOpen(false)} className="hover:text-blue-400">
            👥 Followers
          </Link>

          <Link to="/messaging" onClick={() => setOpen(false)} className="hover:text-blue-400">
            💬 Messages
          </Link>

          <Link to="/help" onClick={() => setOpen(false)} className="hover:text-blue-400">
            🆘 Help
          </Link>

          <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-blue-400">
            📞 Contact
          </Link>

          <Link to="/login" onClick={() => setOpen(false)} className="text-red-400">
            🚪 Logout
          </Link>
        </nav>
        
      </div>
      
    </>
  );
}