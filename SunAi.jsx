import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function SunAi() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const msg = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/sunai", {
        message: msg,
      });

      const aiMsg = { role: "ai", text: res.data.reply };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI error ❌ server ikibazo" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition"
      >
        🤖 AI Chat
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="fixed bottom-20 right-5 w-[95%] sm:w-96 h-[70vh] bg-white shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 font-bold flex justify-between items-center">
            <span>🤖 SunAI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[75%] text-sm shadow
                    ${
                      m.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-gray-400 text-sm animate-pulse">
                AI is thinking...
              </p>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask SunAI..."
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}