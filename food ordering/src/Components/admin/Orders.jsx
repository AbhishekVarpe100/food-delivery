import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/get-orders-data');
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Order ID</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Customer Name</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Mobile Number</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Address</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Item Name</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Quantity</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Total Price</th>
            <th className="px-4 py-2 border-b font-medium text-sm text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((ele) => (
              <tr key={ele._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele._id}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.cust_name}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.mobile}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.addr}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.item_name}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.quantity}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800">{ele.price} Rs.</td>
                <td className="px-4 py-2 border-b text-sm text-gray-800"><button className='bg-green-500 p-2 text-white font-bold hover:bg-green-600 transition duration-500'>Dispatch</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-2 border-b text-center text-sm text-gray-500">
                No orders yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
