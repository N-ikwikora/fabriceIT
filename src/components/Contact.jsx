
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
function Contact() {
  return (
    <>
    <header className="w-full bg-gradient-to-r from-black via-slate-950 to-blue-950 border-b border-blue-900/40 text-white fixed top-0 left-0 z-50 shadow-lg">

  <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

    {/* LOGO */}
    <Link to="/home" className="text-xl font-bold text-blue-400 tracking-wide">
      CareFund
    </Link>

    {/* DESKTOP MENU */}
    <nav className="hidden md:flex items-center gap-5">

      <SearchBar />

      <Link to="/home" className="hover:text-blue-400 transition">
        Home
      </Link>

      <Link to="/about" className="hover:text-blue-400 transition">
        About
      </Link>

      <Link to="/mobileMoney" className="hover:text-blue-400 transition">
        Donations
      </Link>

      <Link to="/help" className="hover:text-blue-400 transition">
        Help
      </Link>

      <Link to="/contact" className="hover:text-blue-400 transition">
        Contact
      </Link>

      <Link
        to="/profile"
        className="px-3 py-1 bg-blue-600/80 hover:bg-blue-500 rounded-lg transition shadow-md"
      >
        Profile
      </Link>

      <Link
        to="/login"
        className="px-3 py-1 bg-black border border-blue-600 hover:bg-red-600 hover:border-red-500 rounded-lg transition"
      >
        Logout
      </Link>

    </nav>

    {/* MOBILE BUTTON */}
    <button
      onClick={() => setOpen(!open)}
      className="md:hidden text-2xl text-blue-400 hover:text-blue-300 transition"
    >
      ☰
    </button>
  </div>

  {/* MOBILE MENU */}
  {open && (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-black/90 border-t border-blue-900">

      <SearchBar />

      <Link to="/home" onClick={() => setOpen(false)} className="hover:text-blue-400">
        Home
      </Link>

      <Link to="/about" onClick={() => setOpen(false)} className="hover:text-blue-400">
        About
      </Link>

      <Link to="/mobileMoney" onClick={() => setOpen(false)} className="hover:text-blue-400">
        Donations
      </Link>

      <Link to="/help" onClick={() => setOpen(false)} className="hover:text-blue-400">
        Help
      </Link>

      <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-blue-400">
        Contact
      </Link>

      <Link
        to="/profile"
        className="text-blue-400"
        onClick={() => setOpen(false)}
      >
        Profile
      </Link>

      <Link
        to="/login"
        className="text-red-400"
        onClick={() => setOpen(false)}
      >
        Logout
      </Link>

    </div>
  )}
</header>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-center">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800">
          📞 Contact Us
        </h1>

        <p className="text-gray-500 mt-1">
          We are here to help you anytime
        </p>

        {/* CONTACT CARD */}
        <div className="mt-6 space-y-4">

          {/* PHONE */}
          <div className="bg-yellow-100 p-4 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-gray-800">📱 Phone</p>
            <p className="text-gray-600">0791406469</p>
          </div>

          {/* WHATSAPP */}
          <div className="bg-green-100 p-4 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-gray-800">💬 WhatsApp</p>
            <p className="text-gray-600">0788234571</p>
          </div>

          {/* FACEBOOK */}
          <div className="bg-blue-100 p-4 rounded-xl hover:shadow-md transition">
            <p className="font-semibold text-gray-800">📘 Facebook</p>
            <p className="text-gray-600">Rugwiro Fabriceost</p>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 space-y-2">

          <a
            href="tel:0791406469"
            className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/250788234571"
            target="_blank"
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Chat on WhatsApp
          </a>

        </div>

      </div>
    </div>
    
     <footer className="w-full bg-black/60 backdrop-blur-md border-t border-white/10 text-white mt-10">

      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

        {/* LEFT TEXT */}
        <p className="text-xs md:text-sm text-gray-300 text-center md:text-left">
          © {new Date().getFullYear()} CareFund. All rights reserved.
        </p>

        {/* CENTER LINKS */}
        <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
          <Link to="/about" className="hover:text-yellow-400 transition">
            About
          </Link>
          <Link to="/help" className="hover:text-yellow-400 transition">
            Help
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
        </div>

        {/* RIGHT SMALL MESSAGE */}
        <p className="text-xs text-gray-400 text-center md:text-right">
          Built with ❤️ to help humanity
        </p>

      </div>
    </footer>
    </>
  );
}

export default Contact;