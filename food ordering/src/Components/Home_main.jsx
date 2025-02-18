import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Home_main = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isValid, setIsValid] = useState(true);
  const [isTokenPresent, setIsTokenPresent] = useState(true);
  const [authData, setAuthData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const checkUserValid = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gethome", {
        params: { token },
      });
      if (res.data.msg === "token not present") {
        setIsTokenPresent(false);
      } else if (res.data.msg === "invalid token") {
        setIsValid(false);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
      } else if (res.data.msg === "profile accessed") {
        setIsValid(true);
        setAuthData(res.data.authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserValid();
  }, []);

  return (
    <div>
      {!isTokenPresent ? (
        <p className="text-red-600 font-semibold text-lg">
          You can't access this page without registering or logging in{" "}
          <Link
            to="/register"
            className="text-blue-600 underline hover:text-blue-800 mx-5"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log In
          </Link>
        </p>
      ) : isValid ? (
        <>
          <div className={`relative transition-all ${isOpen ? "mb-40" : "mb-0"}`}>
            {/* Desktop Menu */}
            <div className="hidden md:flex justify-center space-x-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20">
              <Link
                to="/main_home"
                className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
              >
                Available Items
              </Link>
              <Link
                to="/main_home/orders"
                className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
              >
                Your Orders
              </Link>
              <Link
                to="/main_home/fav"
                className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
              >
                Favorite Items
              </Link>
              <Link
                to="/main_home/suggestions"
                className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
              >
                Your Suggestions
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center text-white bg-green-500 p-2 rounded-lg shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-12 left-0 right-0 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20 flex flex-col space-y-2 z-10">
                <Link
                  to="/main_home"
                  className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Available Items
                </Link>
                <Link
                  to="/main_home/orders"
                  className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Your Orders
                </Link>
                <Link
                  to="/main_home/fav"
                  className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Favorite Items
                </Link>
                <Link
                  to="/main_home/suggestions"
                  className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Your Suggestions
                </Link>
              </div>
            )}
          </div>

          {/* This ensures the content moves down when the menu is open */}
          <div className={`transition-all ${isOpen ? "mt-40" : "mt-0"}`}>
            <Outlet />
          </div>
        </>
      ) : (
        <p className="text-yellow-600 text-lg font-medium">
          Your session has expired.{" "}
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log In
          </Link>{" "}
          again to continue.
        </p>
      )}
    </div>
  );
};

export default Home_main;
