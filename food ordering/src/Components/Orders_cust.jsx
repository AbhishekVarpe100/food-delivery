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
    <div className="overflow-x-auto p-8 bg-gray-50 min-h-screen">
  {/* Table Title */}
  <h1 className="text-3xl font-serif text-gray-900 mb-6 text-center">
    My Orders
  </h1>

  {/* Table */}
  <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
    {/* Table Header */}
    <thead className="bg-gray-800">
      <tr>
        <th className="border border-gray-700 px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
          Item Name
        </th>
        <th className="border border-gray-700 px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
          Quantity
        </th>
        <th className="border border-gray-700 px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
          Total Price
        </th>
        <th className="border border-gray-700 px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100 transition duration-200`}
          >
            {/* Item Name */}
            <td className="border border-gray-200 px-6 py-4 text-gray-800 font-medium">
              {item.item_name}
            </td>

            {/* Quantity */}
            <td className="border border-gray-200 px-6 py-4 text-gray-800">
              {item.quantity}
            </td>

            {/* Total Price */}
            <td className="border border-gray-200 px-6 py-4 text-gray-800">
              {item.price} Rs.
            </td>

            {/* Actions */}
            <td className="border border-gray-200 px-6 py-4">
              <div className="flex flex-col items-center gap-3">
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full max-w-[120px] py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                {item.delivered && (
                  <span className="text-green-600 font-medium text-sm">
                    Item Delivered Successfully
                  </span>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="4"
            className="border border-gray-200 px-6 py-4 text-center text-gray-500 italic"
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
