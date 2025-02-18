import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminSuggestions() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/get-all-suggestions");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Customer Suggestions
        </h2>

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item._id} className="bg-white shadow-md rounded-lg p-5">
                <p className="text-lg font-medium text-gray-700">
                  <span className="font-semibold">Suggested By :</span> {item.username}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Description :</span> {item.suggestion}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Replied :</span>{" "}
                  {!item.reply ? (
                    <span className="text-red-500 font-medium">Not Replied</span>
                  ) : (
                    <span className="text-green-600">{item.reply}</span>
                  )}
                </p>

                <div className="mt-4">
                  <Link
                    to={`/admin/suggestions/reply/${item._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    {!item.reply ? "Give Reply" : "Edit Reply"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No suggestions found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminSuggestions;
