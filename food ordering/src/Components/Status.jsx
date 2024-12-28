import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Status = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/get-status/" + id);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Order Status
        </h2>
        <div className="relative">
          <div className="absolute left-5 top-0 w-1 h-full bg-gray-300"></div>
          <div className="space-y-6">
            {data.ordered && (
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center z-10">
                  1
                </div>
                <p className="text-gray-700 font-medium">Ordered</p>
              </div>
            )}
            {data.packed && (
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center z-10">
                  2
                </div>
                <p className="text-gray-700 font-medium">Packed</p>
              </div>
            )}
            {data.dispached && (
              <div  className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center z-10">
                  3
                </div>
                <p className="text-gray-700 font-medium">Dispatched</p>
              </div>
            )}
            {data.shipped && (
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center z-10">
                  4
                </div>
                <p className="text-gray-700 font-medium">Shipped</p>
              </div>
            )}
            {data.delivered && (
              <div
                className="flex items-center space-x-4 animate-fade"
               
              >
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center z-10">
                  5
                </div>
                <p className="text-gray-700 font-medium">Delivered</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
