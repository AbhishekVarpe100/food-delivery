import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu state for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section with Hamburger Icon */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md md:hidden">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button className="text-2xl" onClick={toggleMenu}>
          ☰
        </button>
      </header>

      {/* Sidebar for Mobile and Medium Screens */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)} // Close the menu when clicking outside
      >
        <div
          className={`bg-gray-700 w-64 h-full p-6 space-y-4 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            className="absolute top-4 right-4 text-2xl text-white"
            onClick={() => setIsMenuOpen(false)} // Close the menu when clicking close button
          >
            ×
          </button>
          <Link
            to="/admin"
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Available Items
          </Link>
          <Link
            to="/admin/add_item"
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Item
          </Link>
          <Link
            to="/admin/orders"
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Orders
          </Link>
          <Link
            to="/admin/cart"
            className="block px-4 py-2 transition duration-300 font-bold bg-green-500 text-white rounded hover:bg-green-600"
          >
            Cart
          </Link>
          <Link
            to="/admin/suggestions"
            className="block px-4 py-2 transition duration-300 font-bold bg-green-500 text-white rounded hover:bg-green-600"
          >
            Customer Suggestions
          </Link>
        </div>
      </div>

      {/* Desktop Menu (Visible only on medium and large screens) */}
      <nav className="hidden md:flex justify-center m-6 space-x-6 mb-6 w-full">
        <Link
          to="/admin"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Available Items
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
        <Link
          to="/admin/suggestions"
          className="px-4 py-2 transition duration-300 font-bold bg-green-500 text-white rounded hover:bg-green-600"
        >
          Customer Suggestions
        </Link>
      </nav>

      {/* Main Content */}
      <div className="w-full p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
