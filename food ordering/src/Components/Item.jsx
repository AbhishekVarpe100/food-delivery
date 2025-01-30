import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Item() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/get-item", {
      params: { id },
    });
    setData([res.data]);
  };

  const handleCart = async (id) => {
    const res = await axios.post("http://localhost:3000/add-to-cart", {
      id,
      username: localStorage.getItem("username"),
    });
    if (res) {
      setRender((prev) => !prev);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, [render]);

  return (
    <div className="flex flex-col items-center py-12 px-4 bg-gray-50 min-h-screen">
  {data ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
      {data.map((ele) => (
        <div
          key={ele._id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transform transition-transform duration-300 hover:scale-102"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={`http://localhost:3000/Food_Images/${ele.file}`}
              alt={ele.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Item Name */}
            <h3 className="text-2xl font-serif font-semibold text-gray-900">
              {ele.name}
            </h3>

            {/* Price and Quantity */}
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Price:</span> {ele.price} Rs.
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Quantity:</span> {ele.quantity} Items
              </p>
            </div>

            {/* Low Stock Warning */}
            {ele.quantity <= 5 && (
              <p className="text-sm text-red-600 font-medium italic">
                Hurry up! Limited quantity left.
              </p>
            )}

            {/* Buttons and Links */}
            <div className="space-y-3">
              {/* Order Now Button */}
              <Link to={`/main_home/order/${ele._id}`}>
                <button className="w-full py-2 px-4 text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500">
                  Order Now
                </button>
              </Link>

              {/* Cart Status or Add to Cart Button */}
              {ele.cart_status === "added" ? (
                <span className="block text-center text-green-700 bg-green-50 font-medium py-2 rounded-md border border-green-100">
                  Item added to cart
                </span>
              ) : (
                <>
                  <button
                    className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleCart(ele._id)}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/main_home/reviews/${ele._id}`}
                    className="block text-center text-blue-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Reviews
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-lg">Loading item details...</p>
  )}
</div>
  );
}

export default Item;
