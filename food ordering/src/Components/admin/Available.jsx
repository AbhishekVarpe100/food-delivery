import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Available() {
  const [data, setData] = useState([]);
  const [delete_, setDelete] = useState(false);

  async function getData() {
    const res = await axios("http://localhost:3000/get-data");
    setData(res.data);
  }
  
  const handleDelete = async (id) => {
    const res = await axios.delete('http://localhost:3000/delete-item/' + id);
    if (res.data === 'deleted') {
      setDelete((prev) => !prev);
    }
  };

  useEffect(() => {
    getData();
  }, [delete_]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Available Food Items</h1>
        <p className="text-lg text-gray-600">
          Total items available: <span className="font-semibold">{data.length}</span>
        </p>
      </div>

      {/* Food Items Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden transition transform duration-300 hover:scale-105"
            >
              {/* Item Image */}
              <img
                loading="lazy"
                src={`http://localhost:3000/Food_Images/${item.file}`}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              {/* Item Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
                <div className="text-gray-600 mb-2">
                  <span className="font-bold">Price:</span> {item.price} Rs.
                </div>
                <div className="text-gray-600 mb-4">
                  <span className="font-bold">Quantity Available:</span> {item.quantity}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="block w-full bg-red-600 text-white text-center py-2 rounded-md font-medium hover:bg-red-500 transition duration-300"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/update-price/${item._id}`}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-md font-medium hover:bg-blue-500 transition duration-300"
                  >
                    Update Price
                  </Link>
                  <Link
                    to={`/admin/update-quantity/${item._id}`}
                    className="block w-full bg-green-600 text-white text-center py-2 rounded-md font-medium hover:bg-green-500 transition duration-300"
                  >
                    Update Quantity
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div  className="col-span-full text-center text-gray-500 text-lg font-medium">
            No food items found.
          </div> 
        )}
      </div>
    </div>
  );
}

export default Available;
