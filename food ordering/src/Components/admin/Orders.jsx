import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/get-orders-data');
      setData(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="border border-gray-300 p-2">Order ID</th>
                <th className="border border-gray-300 p-2">Customer Name</th>
                <th className="border border-gray-300 p-2">Mobile Number</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Total Price</th>
                <th className="border border-gray-300 p-2">Action</th>
                <th className="border border-gray-300 p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((ele) => (
                  <tr key={ele._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{ele._id}</td>
                    <td className="border border-gray-300 p-2">{ele.cust_name}</td>
                    <td className="border border-gray-300 p-2">{ele.mobile}</td>
                    <td className="border border-gray-300 p-2">{ele.addr}</td>
                    <td className="border border-gray-300 p-2">{ele.item_name}</td>
                    <td className="border border-gray-300 p-2">{ele.quantity}</td>
                    <td className="border border-gray-300 p-2">{ele.price} Rs.</td>
                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/admin/orders/update-status/${ele._id}`}
                        className="flex items-center justify-center bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        <FaEdit className="mr-1" /> Update
                      </Link>
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {ele.payment === 'paid' ? (
                        <span className="text-green-600 flex items-center justify-center">
                          <FaCheckCircle className="mr-1" /> Paid
                        </span>
                      ) : (
                        <span className="text-blue-600 flex items-center justify-center">
                          <FaMoneyBillWave className="mr-1" /> Cash on Delivery
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="border border-gray-300 p-4 text-center text-gray-600">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;