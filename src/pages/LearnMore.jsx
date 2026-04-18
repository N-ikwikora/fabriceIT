import React from "react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white">

      {/* HERO SECTION */}
      <section className="pt-24 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Learn More About CareFund
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg">
          CareFund is a humanitarian donation platform dedicated to helping people
          in need. We connect generous hearts with individuals facing poverty,
          illness, and emergency challenges.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/mobileMoney">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold shadow-lg">
              Donate Now
            </button>
          </Link>

          <Link to="/contact">
            <button className="px-8 py-3 border border-blue-500 hover:bg-blue-900/30 rounded-full">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to provide a transparent and secure platform where
            donations directly support individuals and families in urgent need.
            We aim to reduce suffering, restore dignity, and bring hope to those
            facing difficult life situations.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-lg">
          <h3 className="text-xl font-semibold text-yellow-400 mb-3">
            What We Do
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>✔ Collect donations securely</li>
            <li>✔ Support vulnerable individuals</li>
            <li>✔ Provide emergency assistance</li>
            <li>✔ Promote global humanitarian aid</li>
          </ul>
        </div>

      </section>

      {/* VISION */}
      <section className="bg-black/40 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
            Our Vision
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            We envision a world where no one suffers alone. A world where people
            support each other through kindness, unity, and compassion. CareFund
            aims to become a global bridge between those who want to help and
            those who need help the most.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          How CareFund Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              1. Create Account
            </h3>
            <p className="text-gray-300">
              Sign up and become part of our caring community.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              2. Donate or Request Help
            </h3>
            <p className="text-gray-300">
              You can either donate funds or request assistance.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-bold text-green-400 mb-2">
              3. Make Impact
            </h3>
            <p className="text-gray-300">
              Your support directly changes lives and brings hope.
            </p>
          </div>

        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="bg-gradient-to-r from-blue-900/30 to-black py-20 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              Real Impact Matters
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Every donation counts. Even small contributions can provide food,
              shelter, medical support, and hope to someone in need.
              Together we can build a better world.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-lg">
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">
              Why Choose CareFund?
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>✔ Transparent donations</li>
              <li>✔ Secure payment systems</li>
              <li>✔ Real humanitarian impact</li>
              <li>✔ Easy-to-use platform</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="text-center py-20 px-6">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Making a Difference Today
        </h2>

        <p className="text-gray-300 mb-8">
          Join CareFund and help change lives around the world.
        </p>

        <Link to="/mobileMoney">
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold shadow-xl">
            Donate Now
          </button>
        </Link>

      </section>

    </div>
  );
}