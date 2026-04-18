import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function VideoPage() {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef();

  // FETCH VIDEOS
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/videos");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // UPLOAD VIDEO
  const uploadVideo = async () => {
    if (!video || !title) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Video uploaded 🎉");

      setTitle("");
      setVideo(null);
      fileRef.current.value = "";

      fetchVideos();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white px-4 py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
        🎬 Video Center
      </h1>

      {/* UPLOAD */}
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-xl mb-10">

        <h2 className="text-xl font-bold text-center mb-4">
          Upload Video
        </h2>

        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-3 rounded-xl bg-black/40 border border-blue-900"
        />

        <input
          type="file"
          accept="video/*"
          ref={fileRef}
          onChange={(e) => setVideo(e.target.files[0])}
          className="w-full mb-4"
        />

        <button
          onClick={uploadVideo}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold ${
            loading
              ? "bg-gray-500"
              : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105"
          }`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </div>

      {/* VIDEOS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {videos.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No videos yet...
          </p>
        ) : (
          videos.map((v) => (
            <div
              key={v.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
            >
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                {v.title}
              </h3>

              <video controls className="w-full rounded-xl mb-2">
                <source
                  src={`http://localhost:5000/uploads/${v.filename}`}
                  type="video/mp4"
                />
              </video>

              {/* DOWNLOAD BUTTON */}
              <a
                href={`http://localhost:5000/uploads/${v.filename}`}
                download
                className="inline-block px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-md transition mb-2"
              >
                ⬇ Download
              </a>

              <p className="text-xs text-gray-400">
                {new Date(v.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}