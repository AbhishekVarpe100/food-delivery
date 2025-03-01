import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select, MenuItem, Typography } from "@mui/material";
import { motion } from "framer-motion";

function Available_Items() {
  const [data, setData] = useState([]);
  const [option, setOption] = useState("");

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-data-cust");
    setData(res.data);
  }

  const handleOption = async (e) => {
    const option = e.target.value;
    const res = await axios.get("http://localhost:3000/order-by", {
      params: { option },
    });
    if (res.data) setData(res.data);
  };

  const handleSearch = async (e) => {
    let searchText = e.target.value;
    const res = await axios.get("http://localhost:3000/search-item", {
      params: { searchText },
    });
    if (res.data) setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen font-serif">
      {/* Controls */}
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Explore the Finest Food Items
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Sorting Dropdown */}
        <div className="flex items-center bg-white border px-3 py-1 rounded shadow">
          <FaSort className="mr-1 text-gray-600" />
          <Select
            value={option}
            onChange={handleOption}
            displayEmpty
            className="focus:outline-none text-sm text-gray-700"
          >
            <MenuItem value="">Sort by</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
            <MenuItem value="name">Item Name</MenuItem>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white border px-3 py-1 rounded shadow">
          <FaSearch className="mr-1 text-gray-600" />
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="focus:outline-none text-sm text-gray-700 w-32"
          />
        </div>
      </div>

      {/* Items Grid */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white border rounded shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <Link to={`/main_home/${item._id}`}>
                {/* Quantity at the Top */}
                <div className="bg-yellow-300 text-gray-900 font-bold text-xs px-2 py-1 absolute m-2 rounded">
                  {item.quantity} in stock
                </div>
                <img
                  src={`http://localhost:3000/Food_Images/${item.file}`}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="text-gray-700 font-medium">Price: {item.price} Rs.</p>
                  {item.quantity <= 5 && (
                    <p className="text-red-600 font-bold">Limited stock available!</p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <Typography variant="h6" className="text-gray-700 mt-6">
          No items available at the moment.
        </Typography>
      )}
    </div>
  );
}

export default Available_Items;
