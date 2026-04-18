import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; 

export default function Help() {
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
      <div className="px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          How Can We Help You?
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
          Welcome to CareFund Help Center. We are here to guide you on how to
          donate, receive support, and use our platform effectively.
        </p>
      </div>

      {/* HELP CARDS */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid gap-6 md:grid-cols-3">

        {/* CARD 1 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-400 mb-3">
            How to Donate
          </h2>
          <p className="text-gray-300 leading-relaxed">
            To support people in need, go to the Donations page, choose your
            preferred payment method (Mobile Money or Stripe), and complete your
            contribution securely.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-bold text-blue-400 mb-3">
            How to Receive Help
          </h2>
          <p className="text-gray-300 leading-relaxed">
            If you are in need, submit a request through our Contact page.
            Our team will review your case and provide assistance based on
            available support. <Link to="/requestBox">
                                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold">View Help Requests</button>
                               </Link>
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-bold text-green-400 mb-3">
            Account & Support
          </h2>
          <p className="text-gray-300 leading-relaxed">
            You can create an account, log in, and track your donations.
            If you face any issues, contact our support team anytime.
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          <div className="bg-white/10 p-5 rounded-xl border border-white/20">
            <h3 className="font-semibold text-yellow-300">
              Is my donation safe?
            </h3>
            <p className="text-gray-300 mt-1">
              Yes. All donations are processed securely and used transparently
              to help people in need.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/20">
            <h3 className="font-semibold text-yellow-300">
              Can I track my donation?
            </h3>
            <p className="text-gray-300 mt-1">
              Yes. Logged-in users can track their donation history from their profile.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/20">
            <h3 className="font-semibold text-yellow-300">
              How do I contact support?
            </h3>
            <p className="text-gray-300 mt-1">
              Go to the Contact page and send us your message. We respond quickly.
            </p>
          </div>

        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center px-6 pb-20">

        <h2 className="text-3xl font-bold mb-3">
          Need More Help?
        </h2>

        <p className="text-gray-300 mb-6">
          We are always ready to support you. Reach out or start donating today.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">

          <Link to="/contact">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold">
              Contact Support
            </button>
          </Link>

          <Link to="/mobileMoney">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold">
              Start Donating
            </button>
          </Link>
          
            <Link to="/helpRequest">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold">
              Request a Help you need
            </button>
          </Link>

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