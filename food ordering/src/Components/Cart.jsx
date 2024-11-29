import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-cart", {
      params: { username: localStorage.getItem("username") },
    });
    setData(res.data);
  }

  async function handleDelete(id) {
    const res = await axios.delete("http://localhost:3000/remove-cart/" + id);
    if (res.data === "deleted") {
      setRender((prev) => !prev);
    }
  }

  useEffect(() => {
    getData();
  }, [render]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-700 mb-6 border-b-4 border-green-500 pb-2">
        Your Cart
      </h1>

      {data.length === 0 ? (
        // Empty Cart Message
        <div className="text-gray-500 text-lg font-medium">
          No items in your cart. Start shopping now!
        </div>
      ) : (
        // Cart Table
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-left text-gray-700 uppercase text-sm font-semibold">
                <th className="p-4 border-b-2 border-gray-300">Image</th>
                <th className="p-4 border-b-2 border-gray-300">Item Name</th>
                <th className="p-4 border-b-2 border-gray-300">Price</th>
                <th className="p-4 border-b-2 border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele) => (
                <tr
                  key={ele._id}
                  className="hover:bg-gray-100 transition-colors duration-300"
                >
                  {/* Image */}
                  <td className="p-4 border-b border-gray-200">
                    <Link to={`/cart/${ele.file}`}>
                      <img title={ele.name}
                        src={`http://localhost:3000/Food_Images/${ele.file}`}
                        alt="A food item"
                        className="w-20 h-20 object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                  </td>

                  {/* Item Name */}
                  <td className="p-4 border-b border-gray-200 text-gray-700">
                    {ele.name}
                  </td>

                  {/* Price */}
                  <td className="p-4 border-b border-gray-200 text-green-600 font-semibold">
                    {ele.price} Rs.
                  </td>

                  {/* Remove Button */}
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleDelete(ele._id)}
                      className="bg-red-500 text-white rounded-md px-4 py-2 shadow-sm hover:bg-red-600 transition-colors duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cart;
