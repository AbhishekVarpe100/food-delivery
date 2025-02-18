import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

function NavBar() {
  const [username, setUser] = useState(localStorage.getItem("username"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cartCountTotal, setCount] = useState(0);

  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setTimeout(() => {
      navigate("/login");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };

  const getCartCount = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/get-cart-count?username=${username}`,
        { method: "GET" }
      );
      if (res.ok) {
        let data = await res.json();
        setCount(data.cart_count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCount();
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-white font-extrabold text-2xl tracking-wide"
        >
          FoodOrdering<span className="text-green-400">Platform</span>.com
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-300 md:hidden focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>

        {/* Overlay (Blurred Background) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg transition-opacity duration-300 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Menu (Ensuring Solid Background) */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-gray-900 shadow-lg transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out p-6 md:hidden z-50`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Links */}
          <div className="flex flex-col space-y-6 mt-12">
            <Link
              to="/"
              className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {username ? (
              <>
                <Link
                  onClick={handleLogOut}
                  className="text-gray-300 hover:text-green-400 font-medium transition duration-300 cursor-pointer"
                >
                  Log out
                </Link>

                <Link to="/cart" className="relative">
                  <FaShoppingCart
                    title={`Cart : ${cartCountTotal} Items`}
                    className="text-gray-300 w-6 h-6 hover:text-green-400 transition duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-green-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCountTotal}
                  </div>
                </Link>

                <div className="text-gray-300 font-medium">
                  <span>{username}</span>
                  <span className="block text-sm text-gray-400">
                    {localStorage.getItem("email")}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-green-400 font-medium transition duration-300"
          >
            Home
          </Link>

          {username ? (
            <div className="md:flex md:items-center md:space-x-6">
              <Link
                onClick={handleLogOut}
                className="text-gray-300 hover:text-green-400 font-medium transition duration-300 cursor-pointer"
              >
                Log out
              </Link>

              <Link to="/cart" className="relative">
                <FaShoppingCart
                  title={`Cart : ${cartCountTotal} Items`}
                  className="text-gray-300 w-6 h-6 hover:text-green-400 transition duration-300"
                />
                <div className="absolute -top-2 -right-2 bg-green-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCountTotal}
                </div>
              </Link>

              <div className="text-gray-300 font-medium">
                <span>{username}</span>
                <span className="block text-sm text-gray-400">
                  {localStorage.getItem("email")}
                </span>
              </div>
            </div>
          ) : (
            <>
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
  );
}

export default NavBar;
