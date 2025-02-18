import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ReplyToSuggestion() {
  const { id } = useParams();
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  const handleReply = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/post-reply", {
      reply,
      id,
    });

    if (res.data) {
      alert("Reply posted");
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Reply to Suggestion #{id}
        </h2>
        <form onSubmit={handleReply} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your reply"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setReply(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Post Reply
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReplyToSuggestion;
