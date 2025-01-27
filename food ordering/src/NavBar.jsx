import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios'
function NavBar() {
  const [username, setUser] = useState(localStorage.getItem('username'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cartCountTotal,setCount]=useState(0)

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

  const getCartCount=async()=>{
    try {

      const res=await fetch(`http://localhost:3000/get-cart-count?username=${username}`,{method:'GET'})
      if(res.ok){
        let data= await res.json()

        setCount(data.cart_count)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getCartCount()
  },[])

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
                  <div className="relative">
                <FaShoppingCart
                  title={`Cart : ${cartCountTotal} Items`}
                  className="text-gray-300 w-6 h-6 hover:text-green-400 transition duration-300"
                />
                <div className="absolute -top-2 -right-2 bg-green-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCountTotal}
            </div>
          </div>

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
