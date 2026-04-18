import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
export default function About() {
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



    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/helping-hands.jpg')] bg-cover bg-center opacity-20"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Together We Can Change Lives
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            A trusted donation platform dedicated to helping people in need.
            We connect generous hearts with those facing life challenges.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            
            <Link to="/mobileMoney">
            <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg transition">
              Make a Donation
            </button>
            </Link>
            
             <Link to="/learnMore">
             <button className="px-8 py-3 border border-white/30 hover:bg-white/10 rounded-full transition">
              Learn More
            </button>
             </Link>
            
          </div>
        </div>
      </div>

      {/* MISSION / VISION SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">

        {/* Mission */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Our Mission
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Our mission is to provide a safe and transparent donation platform
            that supports individuals and families in urgent need.
            We aim to bring hope, dignity, and relief to those suffering
            from poverty, illness, and emergencies.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Our Vision
          </h2>
          <p className="text-gray-200 leading-relaxed">
            We envision a world where humanity stands together,
            where no one is left behind, and where kindness becomes
            a global culture of support, unity, and compassion.
          </p>
        </div>
      </div>

      {/* WHY SUPPORT US SECTION */}
      <div className="bg-black/40 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Why Support Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                Transparency
              </h3>
              <p className="text-gray-300">
                Every donation is tracked and used for real impact.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Real Impact
              </h3>
              <p className="text-gray-300">
                We directly support people in urgent need.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition">
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Humanity First
              </h3>
              <p className="text-gray-300">
                Our goal is to restore hope and dignity to lives.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="max-w-4xl mx-auto text-center py-20 px-6">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Be Part of the Change
        </h2>

        <p className="text-gray-300 mb-8">
          Your support can transform someone’s life today.
          Even a small donation can make a big difference.
        </p>
           
       <Link to="/usersList">
       
        <button className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full shadow-xl hover:scale-105 transition">
          CareFund-Members-list
        </button>
       </Link>


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