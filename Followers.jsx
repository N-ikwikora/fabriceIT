
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Followers() {
  const user = localStorage.getItem("user");
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/${user}`)
      .then((res) => setFollowers(res.data));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-600">
          👥 Your Followers
           <Link to="/home">
              <button className="px-2  rounded-lg bg-yellow-400/80 hover:bg-yellow-500 text-black font-semibold">
                Home
              </button>
            </Link>
        </h2>
        <p className="text-gray-500">
          People who follow you
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto">

        {followers.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">No followers yet 😢</p>
          </div>
        ) : (
          <div className="space-y-3">

            {followers.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  {f.name?.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {f.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Follows your profile
                  </p>
                </div>

                {/* Action button (optional) */}
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  View
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}