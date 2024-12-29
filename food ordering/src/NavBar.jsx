import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function NavBar() {
  const [username, setUser] = useState(localStorage.getItem('username'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setTimeout(() => {
      navigate('/login');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white font-extrabold text-2xl tracking-wide">
          FoodOrdering<span className="text-green-400">Platform</span>.com
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-300 md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>

        {/* Links and User Info */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-8 mt-4 md:mt-0 w-full md:w-auto`}
        >
          {/* Common Links */}
          <Link
            to="/"
            className="block text-gray-300 hover:text-green-400 font-medium transition duration-300 md:inline"
          >
            Home
          </Link>

          {username ? (
            <div className="md:flex md:items-center md:space-x-6">
              {/* Logout */}
              <Link
                onClick={handleLogOut}
                className="block text-gray-300 hover:text-green-400 font-medium transition duration-300 cursor-pointer md:inline"
              >
                Log out
              </Link>

              {/* Cart Icon */}
              {username !== 'undefined' ? (
                <Link to="/cart" className="block relative md:inline">
                  <FaShoppingCart
                    title="Cart"
                    className="text-gray-300 w-6 h-6 hover:text-green-400 transition duration-300"
                  />
                </Link>
              ) : null}

              {/* User Info */}
              {username !== 'undefined' ? (
                <div className="block text-gray-300 font-medium md:inline">
                  <span className="block">{username}</span>
                  <span className="block text-sm text-gray-400">
                    {localStorage.getItem('email')}
                  </span>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              {/* Login and Register Links */}
              <Link
                to="/login"
                className="block text-gray-300 hover:text-green-400 font-medium transition duration-300 md:inline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-300 hover:text-green-400 font-medium transition duration-300 md:inline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
