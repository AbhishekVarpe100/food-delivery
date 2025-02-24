import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select, MenuItem } from "@mui/material";
import { Typography } from "@mui/material";

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  const carouselContent = [
    {
      img: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      text: "Indulge in a feast of flavors, crafted with passion and tradition.",
    },
    {
      img: "https://cdn.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png",
      text: "Savor the richness of gourmet delights, made just for you.",
    },
    {
      img: "https://media.istockphoto.com/id/1908197459/photo/family-breakfast.jpg?s=612x612&w=0&k=20&c=Ry5HPFYwkpL2MHdSOz5Rh0AzCgOD8qjXC9Y0WL-w858=",
      text: "A classic taste that never fades – enjoy every bite.",
    },
    {
      img: "https://fitandflex.in/cdn/shop/articles/istockphoto-1127563435-612x612_1445x.jpg?v=1720790357",
      text: "From farm to table, experience the essence of fine dining.",
    },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen font-serif">
      {/* Carousel */}
      <div className="relative w-full max-w-4xl mb-8 rounded-lg overflow-hidden shadow-xl border border-gray-300">
        <Slider {...settings}>
          {carouselContent.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.img}
                alt={`carousel-img-${index}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-6 left-6 bg-gradient-to-r from-black via-gray-800 to-transparent p-4 rounded-lg">
                <h1 className="text-white text-xl font-bold">{item.text}</h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Controls */}
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Explore the Finest Food Items
      </h2>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Sorting Dropdown */}
        <div className="flex items-center bg-white border-2 border-gray-300 px-4 py-2 rounded-lg shadow-md">
          <FaSort className="mr-2 text-gold-500" />
          <Select
            value={option}
            onChange={handleOption}
            displayEmpty
            className="focus:outline-none text-lg text-gray-700"
          >
            <MenuItem value="">Sort by</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
            <MenuItem value="name">Item Name</MenuItem>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white border-2 border-gray-300 px-4 py-2 rounded-lg shadow-md">
          <FaSearch className="mr-2 text-gold-500" />
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search item..."
            className="focus:outline-none text-lg text-gray-700"
          />
        </div>
      </div>

      {/* Items Grid */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <Link to={`/main_home/${item._id}`}>
                <img
                  src={`http://localhost:3000/Food_Images/${item.file}`}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-700 font-medium">
                    Price: {item.price} Rs.
                  </p>
                  {item.quantity <= 5 && (
                    <p className="text-red-600 font-bold">
                      Limited stock available!
                    </p>
                  )}
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </Link>
            </div>
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
