import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(false);
  const [rsp,setRsp]=useState(false)
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    full_name: "",
    mobile: "",
    address: "",
    username: localStorage.getItem("username"),
    email:localStorage.getItem('email')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-cart", {
      params: { username: localStorage.getItem("username") },
    });
    setData(res.data);
  }

  async function handleDelete(id) {
    const res = await axios.delete("http://localhost:3000/remove-cart/" + id);
    if (res.data === "deleted") {
      setRender((prev) => !prev);
    }
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    setRsp(true)
    const res = await axios.post("http://localhost:3000/confirm-all-order", orderData);
    if (res.data === "ordered") {
      alert("Order confirmed!");
      setRsp(false)
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, [render, page]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2">
        Your Cart
      </h1>

      {data.length === 0 ? (
        // Empty Cart Message
        <div className="text-gray-600 text-xl font-medium flex flex-col items-center space-y-4">
          <p>Your cart is empty. Start shopping now!</p>
          <Link title="Go to shop"
            to="/main_home"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        // Cart Table
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          {!page ? (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-100 text-left text-gray-700 uppercase text-sm font-semibold">
                  <th className="p-4 border-b-2 border-gray-300">Image</th>
                  <th className="p-4 border-b-2 border-gray-300">Item Name</th>
                  <th className="p-4 border-b-2 border-gray-300">Price</th>
                  <th className="p-4 border-b-2 border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ele) => (
                  <tr
                    key={ele._id}
                    className="hover:bg-gray-100 transition-colors duration-300"
                  >
                    {/* Image */}
                    <td className="p-4 border-b border-gray-200">
                      <Link to={`/cart/${ele.file}`}>
                        <img
                          title={ele.name}
                          src={`http://localhost:3000/Food_Images/${ele.file}`}
                          alt="A food item"
                          className="w-20 h-20 object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                    </td>

                    {/* Item Name */}
                    <td className="p-4 border-b border-gray-200 text-gray-700">
                      {ele.name}
                    </td>

                    {/* Price */}
                    <td className="p-4 border-b border-gray-200 text-green-600 font-semibold">
                      {ele.price} Rs.
                    </td>

                    {/* Remove Button */}
                    <td className="p-4 border-b border-gray-200">
                      <button
                        onClick={() => handleDelete(ele._id)}
                        className="bg-red-500 text-white rounded-md px-4 py-2 shadow-sm hover:bg-red-600 transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="p-4">
                    <button
                      onClick={() => setPage((prev_) => !prev_)}
                      className="w-full bg-green-500 text-white py-2 rounded-md shadow-md font-bold hover:bg-green-600 transition-colors duration-300"
                    >
                      Order All
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={() => setPage((prev_) => !prev_)}
                className="mb-4 px-5 py-2 bg-gray-100 text-gray-700 border border-gray-400 rounded-lg shadow hover:bg-gray-200 transition duration-300"
              >
                Back to Cart
              </button>

              {/* Order Form */}
              <form
                onSubmit={handleOrder}
                className="bg-gray-50 p-8 max-w-lg mx-auto shadow-lg rounded-xl border border-gray-300"
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                  Confirm Your Order
                </h2>
                <div className="mb-5">
                  <label
                    htmlFor="full_name"
                    className="block text-base font-medium text-gray-800 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="full_name"
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-gray-700"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="mobile"
                    className="block text-base font-medium text-gray-800 mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="mobile"
                    type="text"
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-gray-700"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="block text-base font-medium text-gray-800 mb-2"
                  >
                    Home Address
                  </label>
                  <input
                    required
                    onChange={handleChange}
                    name="address"
                    type="text"
                    placeholder="Enter home address"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:ring focus:ring-blue-200 focus:outline-none text-gray-700"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    value={`${rsp?'Please wait':'Confirm order'}`}
                    className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
