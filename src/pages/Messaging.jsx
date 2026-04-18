import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Messaging() {
  const user = localStorage.getItem("user");

  const [receiver, setReceiver] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);

  const chatEndRef = useRef(null);

  // REGISTER USER
  useEffect(() => {
    if (user) socket.emit("addUser", user);
  }, [user]);

  // LOAD CHAT LIST FROM DB (AUTO)
  useEffect(() => {
    if (!user) return;

    const loadChats = async () => {
      const res = await axios.get(
        `http://localhost:5000/chat-partners/${user}`
      );
      setChatList(res.data);
    };

    loadChats();
  }, [user]);

  // RECEIVE MESSAGE (REALTIME)
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);

      setChatList((prev) => {
        if (prev.includes(data.sender)) return prev;
        if (data.sender === user) return prev;
        return [...prev, data.sender];
      });
    };

    socket.on("receiveMessage", handleMessage);
    return () => socket.off("receiveMessage", handleMessage);
  }, []);

  // LOAD CHAT MESSAGES
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:5000/messages/${user}/${activeChat}`
      );
      setMessages(res.data);
    };

    fetchMessages();
  }, [activeChat, user]);

  // OPEN CHAT
  const openChat = () => {
    if (!receiver) return;

    setActiveChat(receiver);

    setChatList((prev) => {
      if (prev.includes(receiver)) return prev;
      return [...prev, receiver];
    });
  };

  const openChatFromList = (name) => {
    setActiveChat(name);
    setReceiver(name);
  };

const send = async () => {
  if (!msg || !activeChat) return;

  const data = {
    sender: user,
    receiver: activeChat,
    message: msg,
  };

  await axios.post("http://localhost:5000/send", data);

  socket.emit("sendMessage", data);

  setMsg("");
};

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT */}
      <div className="w-1/3 bg-[#111b21] text-white p-4 flex flex-col">

        <h2 className="text-xl font-bold mb-4">💬 Chats</h2>

        <input
          className="p-2 rounded-md text-black mb-3"
          placeholder="Enter username..."
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        <button
          onClick={openChat}
          className="bg-green-500 p-2 rounded-md"
        >
          Open Chat
        </button>

        {/* CHAT LIST */}
        <div className="mt-4 flex-1 overflow-y-auto">

          <h3 className="text-sm opacity-70 mb-2">
            Recent Chats
          </h3>

          {chatList.length === 0 && (
            <p className="text-xs opacity-50">No chats yet</p>
          )}

          {chatList.map((name, i) => (
            <div
              key={i}
              onClick={() => openChatFromList(name)}
              className="p-2 mb-2 bg-[#202c33] rounded-md cursor-pointer hover:bg-[#2a3942]"
            >
              👤 {name}
            </div>
          ))}
        </div>

        <div className="text-sm opacity-70">
          Logged in: <b>{user}</b>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-2/3 flex flex-col bg-[#efeae2]">

        <div className="p-4 bg-gray-200 border-b">
          Chat with: <b>{activeChat || "..."}</b>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-xs p-2 rounded ${
                m.sender === user
                  ? "ml-auto bg-green-200"
                  : "bg-white"
              }`}
            >
              <small>{m.sender}</small>
              <div>{m.message}</div>
            </div>
          ))}

          <div ref={chatEndRef}></div>
        </div>

        <div className="p-3 flex gap-2 bg-gray-200">

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 p-2 border rounded"
            placeholder="Type message..."
          />

          <button
            onClick={send}
            className="bg-green-500 px-4 text-white rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}