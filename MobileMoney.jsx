import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; 

export default function MobileMoney() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/momo-pay", {
        phone,
        amount,
      });
      alert("Payment request sent to your phone 📱");
      setPhone("");
      setAmount("");
    } catch (err) {
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
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


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-blue-950 px-4 text-white">

      {/* GLOW EFFECT */}
      <div className="absolute w-72 h-72 bg-blue-600 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-green-500 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8">

          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-400 mb-2">
            Mobile Money Payment
          </h2>

          <p className="text-center text-gray-300 mb-6">
            Support CareFund by sending your donation securely.
          </p>

          {/* FORM */}
          <div className="space-y-4">

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-300">Phone Number</label>
              <input
                placeholder="e.g 2507XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-blue-900
                focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-300">Amount (RWF)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-blue-900
                focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={pay}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold transition shadow-lg
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black"
              }`}
            >
              {loading ? "Processing..." : "Pay with MoMo"}
            </button>
          </div>

          {/* INFO */}
          <p className="text-xs text-gray-400 text-center mt-5">
            You will receive a prompt on your phone to confirm the payment.
          </p>
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