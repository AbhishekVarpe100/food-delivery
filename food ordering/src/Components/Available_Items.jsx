import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Select, MenuItem, Typography } from "@mui/material";
import { motion } from "framer-motion";

function Available_Items() {
  const [data, setData] = useState([]);
  const [option, setOption] = useState("");
  const [searchText, setSearchText] = useState("");

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-data-cust");
    setData(res.data);
  }

  const handleOption = async (e) => {
    const option = e.target.value;
    setOption(option);
    const res = await axios.get("http://localhost:3000/order-by", {
      params: { option },
    });
    if (res.data) setData(res.data);
  };

  const handleSearch = async (e) => {
    const text = e.target.value;
    setSearchText(text);
    
    const res = await axios.get("http://localhost:3000/search-item", {
      params: { searchText: text },
    });
    if (res.data) setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 font-serif">
      {/* Classic Header with ornamental design */}
      <div className="bg-amber-900 text-amber-50 py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold italic mb-2">The Gourmet Collection</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-16 bg-amber-200"></div>
            <span className="text-amber-200">✦</span>
            <div className="h-px w-16 bg-amber-200"></div>
          </div>
          <p className="text-amber-200 italic">Fine delicacies for discerning palates</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Classic search and filter controls */}
        <div className="mb-10 bg-stone-50 border border-amber-200 rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-amber-900 font-semibold mb-2 text-sm">Search Our Collection</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearch}
                  placeholder="Enter dish name..."
                  className="w-full border border-amber-300 rounded py-2 px-4 pl-10 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-5 w-5 text-amber-700" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-amber-900 font-semibold mb-2 text-sm">Sort Collection By</label>
              <div className="relative">
                <Select
                  value={option}
                  onChange={handleOption}
                  displayEmpty
                  className="w-full bg-stone-50 border border-amber-300 rounded text-amber-900"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FED7AA',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F59E0B',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#B45309',
                    },
                    '& .MuiSelect-select': {
                      fontFamily: 'serif',
                      padding: '10px 14px',
                    }
                  }}
                >
                  <MenuItem value="" sx={{ fontFamily: 'serif' }}>All Items</MenuItem>
                  <MenuItem value="price" sx={{ fontFamily: 'serif' }}>Price</MenuItem>
                  <MenuItem value="quantity" sx={{ fontFamily: 'serif' }}>Quantity</MenuItem>
                  <MenuItem value="name" sx={{ fontFamily: 'serif' }}>Item Name</MenuItem>
                </Select>
                <svg 
                  className="absolute right-10 top-2.5 h-5 w-5 text-amber-700 pointer-events-none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Classic item cards */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to={`/main_home/${item._id}`} className="block">
                  <div className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-amber-100">
                    {/* Ornamental corner decorations */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-700 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-700 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-700 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-700 rounded-br-lg"></div>
                    
                    {/* Image container with frame effect */}
                    <div className="relative pt-4 px-4">
                      <div className="relative rounded overflow-hidden border-2 border-amber-200">
                        {/* Stock indicator */}
                        {item.quantity <= 5 ? (
                          <div className="absolute top-2 right-2 z-10 bg-red-100 border border-red-500 text-red-700 text-xs font-bold px-2 py-1 rounded">
                            Only {item.quantity} left!
                          </div>
                        ) : (
                          <div className="absolute top-2 right-2 z-10 bg-amber-100 border border-amber-500 text-amber-700 text-xs font-bold px-2 py-1 rounded">
                            {item.quantity} in stock
                          </div>
                        )}
                        
                        <img
                          src={`http://localhost:3000/Food_Images/${item.file}`}
                          alt={item.name}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Content with elegant typography */}
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-amber-900 mb-2 border-b border-amber-200 pb-2">{item.name}</h2>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                          <span className="font-medium text-amber-800">{item.price} Rs.</span>
                        </div>
                        
                        <div className="text-amber-700 group-hover:translate-x-1 transition-transform duration-300">
                          <span className="font-serif italic text-sm mr-1">View Details</span>
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-stone-50 border border-amber-200 rounded-lg">
            <div className="inline-block p-4 bg-amber-50 rounded-full mb-4">
              <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <Typography variant="h6" className="font-serif text-amber-900 italic">
              Our kitchen is currently empty.
            </Typography>
            <p className="text-amber-700 mt-2">Please check back later for our delightful offerings.</p>
          </div>
        )}
      </div>
      
      {/* Classic footer */}
      <div className="mt-16 border-t border-amber-200 py-6 bg-stone-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-10 bg-amber-300"></div>
            <span className="text-amber-700">✦</span>
            <div className="h-px w-10 bg-amber-300"></div>
          </div>
          <p className="text-amber-700 italic text-sm">
            "The discovery of a new dish does more for the happiness of mankind than the discovery of a star."
          </p>
          <p className="text-amber-500 text-xs mt-1">— Jean Anthelme Brillat-Savarin</p>
        </div>
      </div>
    </div>
  );
}

export default Available_Items;