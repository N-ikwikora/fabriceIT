import { Link } from "react-router-dom";
import bgImage from "../assets/money.png";
import SunAI from "../pages/SunAi";


export default function Home() {
  return (
    <>
  
    
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
       <SunAI /> 
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* MAIN WRAPPER */}
      <div className="relative z-10">


        {/* ================= HERO CONTENT ================= */}
        <main className="flex items-center justify-center h-[80vh] px-2">

          <div className="bg-white/10 backdrop-blur-lg border border-white/20
            rounded-2xl p-0 text-center text-white shadow-2xl max-w-xl w-full">

            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Welcome to Our CareFund Site!
            </h2>
             
             <Link to="/videoPage">
               <button className="px-8 py-1 bg-blue-500 → hover:bg-blue-600 text-green-400 font-bold rounded-full shadow-lg transition">Watch videos here</button>
             </Link>

            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold underline">
                Funding care for those in need.
              </span>
              <br />
              Providing financial support to help individuals access essential care,
              improve wellbeing, and receive assistance during difficult life situations.
            </p>

          </div>
        </main>

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
    </div>
    </>
  );
}