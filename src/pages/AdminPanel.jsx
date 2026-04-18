import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [page, setPage] = useState("home");
  const [seconds, setSeconds] = useState("");
  const [token] = useState("ADMIN_SECRET_123");

  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH STATUS
  // =========================
  const fetchStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/page-status/${page}`
      );
      setStatus(res.data || {});
    } catch (err) {
      setStatus({});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, [page]);

  // =========================
  // BLOCK / UNBLOCK
  // =========================
  const blockPage = async (state) => {
    await axios.post(
      "http://localhost:5000/admin/block-page",
      { page, status: state },
      { headers: { "admin-token": token } }
    );

    fetchStatus();
  };

  // =========================
  // SET LIMIT
  // =========================
  const setLimit = async () => {
    await axios.post(
      "http://localhost:5000/admin/set-limit",
      { page, time_limit: Number(seconds) },
      { headers: { "admin-token": token } }
    );

    fetchStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // ✅ ADMIN NEVER BLOCKED (NO HARD BLOCK HERE)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl font-bold text-blue-400 mb-6">
        Admin Page Control System
      </h1>

      {/* PAGE INPUT */}
      <input
        className="p-2 bg-gray-800 mb-4 w-full"
        placeholder="Page name (e.g videos, chat, search)"
        value={page}
        onChange={(e) => setPage(e.target.value)}
      />

      {/* BLOCK BUTTONS */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => blockPage(1)}
          className="bg-red-600 p-2 w-full"
        >
          Block
        </button>

        <button
          onClick={() => blockPage(0)}
          className="bg-green-600 p-2 w-full"
        >
          Unblock
        </button>
      </div>

      {/* LIMIT */}
      <input
        className="p-2 bg-gray-800 mb-2 w-full"
        placeholder="Seconds limit"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />

      <button
        onClick={setLimit}
        className="bg-blue-600 p-2 w-full mb-6"
      >
        Set Limit
      </button>

      {/* STATUS */}
      <div className="bg-black p-4 rounded">
        <p>Page: {page}</p>
        <p>Blocked: {status?.is_blocked == 1 ? "YES" : "NO"}</p>
        <p>Limit: {status?.time_limit || "None"}</p>
      </div>

    </div>
  );
}