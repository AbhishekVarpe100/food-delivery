import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h1>
      <nav className="flex space-x-4 mb-6">

      <Link 
          to="/admin" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Available items
        </Link>
        <Link 
          to="/admin/add_item" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Item
        </Link>
        <Link 
          to="/admin/orders" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Orders
        </Link>

        <Link 
          to="/admin/cart" 
          className="px-4 py-2 transition duration-300 font-bold bg-green-500 text-white rounded hover:bg-green-600"
        >
          Cart
        </Link>
      </nav>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
