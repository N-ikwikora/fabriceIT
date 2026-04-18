import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔥 DEBOUNCE SEARCH
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length > 1) {
        try {
          const res = await axios.get(
            `http://localhost:5000/search-users?q=${query}`
          );
          setResults(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setResults([]);
      }
    }, 300); // delay 300ms

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search users..."
        className="w-full px-4 py-2 rounded-lg border shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="absolute bg-white w-full mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">

          {results.map((user, index) => (
            <div
              key={index}
              onClick={() =>
                (window.location.href = `/profile/${user.name}`)
              }
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition"
            >
              {/* IMAGE */}
              <img
                src={
                  user.image
                    ? `http://localhost:5000/uploads/${user.image}`
                    : "https://via.placeholder.com/40"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* TEXT */}
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.bio || "No bio"}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}