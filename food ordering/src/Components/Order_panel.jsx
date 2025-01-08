import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Order_panel() {
  const { id } = useParams();

  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [name_, setName] = useState('');
  const [num, setNum] = useState('');
  const [addr, setAddr] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rsp, setRsp] = useState(false);

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/get-item', { params: { id } });
    setData(res.data);
  };

  const [price, setPrice] = useState();

  const item = {
    name: name_,
    phone: num,
    address: addr,
    item: data.name,
    price: price,
    quantity: quantity,
    av_quantity: data.quantity,
    username: localStorage.getItem('username'),
    file: data.file,
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (data.price && value) {
      setPrice(`${Number.parseInt(data.price) * Number.parseInt(value)}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRsp(true);
    if (Number.parseInt(quantity) > Number.parseInt(data.quantity)) {
      alert("Quantity should not be greater than available quantity of " + data.quantity);
      setRsp(false);
    } else {
      const res = await axios.post('http://localhost:3000/confirm-order', item);
      if (res.data) {
        setRsp(false);
        alert("Order confirmed");
        setTimeout(() => {
          navigate('/main_home');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.quantity > 0 ? (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Order Information</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                required
                id="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                required
                id="mobile"
                onChange={(e) => setNum(e.target.value)}
                type="text"
                placeholder="Enter mobile number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
              <input
                required
                id="address"
                onChange={(e) => setAddr(e.target.value)}
                type="text"
                placeholder="Enter home address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                id="itemName"
                value={data.name}
                disabled
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                value={price ? price : data.price}
                id="price"
                disabled
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                required
                id="quantity"
                placeholder="Enter quantity"
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>Available Quantity {data.quantity}</div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center"
              >
                {rsp ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Confirm order"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-red-100 text-red-800 border border-red-400 rounded-md p-4 text-center mt-4">
          Sorry! Item is not available. It will be available soon!
        </div>
      )}
    </>
  );
}

export default Order_panel;
