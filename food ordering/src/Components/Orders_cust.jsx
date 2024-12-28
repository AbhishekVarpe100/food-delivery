import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function Orders_cust() {
  const [data, setdata] = useState([]);
  const [success, setSuccess] = useState(false);

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/get-orders', {
      params: { username: localStorage.getItem('username') },
    });
    setdata(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/delete-order/${id}`);
    if (res.data === 'deleted') {
      setSuccess((prev) => !prev);
    }
  };

  useEffect(() => {
    getData();
  }, [success]);

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-serif text-gray-800 mb-4 text-center">My Orders</h1>
      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Item Name</th>
            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Quantity</th>
            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Total Price</th>
            <th className="border border-gray-300 px-6 py-3 text-left font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{item.item_name}</td>
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{item.quantity}</td>
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{item.price}</td>
                <td className="border border-gray-300 px-6 py-4 text-center">
  <div className="flex flex-col items-center gap-2">
    {/* Delete Button */}
    <button
      onClick={() => handleDelete(item._id)}
      className="transition duration-300 ease-in-out hover:bg-red-600 bg-red-500 font-semibold px-4 py-2 text-sm rounded-lg text-white shadow-md hover:shadow-lg"
    >
      Delete
    </button>

    {/* Item Status Link */}
    <Link
      to={`/main_home/orders/status/${item._id}`}
      className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition duration-200"
    >
      Item Status
    </Link>

    {/* Delivery Status */}
    {item.delivered ? (
      <span className="text-green-600 font-medium text-sm">
        Item Delivered Successfully
      </span>
    ) : null}
  </div>
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 px-6 py-3 text-center text-gray-500 italic"
              >
                You have not ordered anything yet...!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders_cust;
