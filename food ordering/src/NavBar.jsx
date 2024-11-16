import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
function NavBar(){

  const [username,setUser]=useState(localStorage.getItem('username'));
  const navigate=useNavigate();

  const handleLogOut=()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('email')
    setTimeout(()=>{
      navigate('/login')
      setTimeout(()=>{
        window.location.reload();
      },500)
    },1000)
  }

  
    return (

      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white font-extrabold text-2xl tracking-wide">
          FoodOrdering<span className="text-green-400">Platform</span>.com
        </a>
    
        {/* Links and User Info */}
        <div className="flex items-center space-x-8">
          {/* Common Links */}
          <Link
            to="/"
            className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
          >
            Home
          </Link>
    
          {username ? (
            <div className="flex items-center space-x-6">
              {/* Logout */}
              <Link
                onClick={handleLogOut}
                className="text-gray-300 hover:text-green-400 font-medium transition duration-300 cursor-pointer"
              >
                Log out
              </Link>
    
              {/* Cart Icon */}
              <Link to="/cart" className="relative">
                <FaShoppingCart
                  title="Cart"
                  className="text-gray-300 w-6 h-6 hover:text-green-400 transition duration-300"
                />
              </Link>
    
              {/* User Info */}
              <div className="text-gray-300 font-medium">
                <span className="block">{username}</span>
                <span className="block text-sm text-gray-400">
                  {localStorage.getItem('email')}
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Login and Register Links */}
              <Link
                to="/login"
                className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
    

    

    )
}

export default NavBar;
