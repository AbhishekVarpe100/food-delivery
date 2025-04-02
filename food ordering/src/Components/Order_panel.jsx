import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import notificationSound from './notification_sound.mp3';

function OrderPanel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [name_, setName] = useState('');
  const [num, setNum] = useState('');
  const [addr, setAddr] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rsp, setRsp] = useState(false);
  const [ui_, setUi] = useState(false);
  const [price, setPrice] = useState(0);
  const [playAudio,setPlayAudio]=useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/get-item', { params: { id } });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    getData();
  }, [id]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    if (data.price && value) {
      setPrice(Number.parseInt(data.price) * Number.parseInt(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRsp(true);

    if (Number.parseInt(quantity) > Number.parseInt(data.quantity)) {
      alert(`Quantity should not be greater than available quantity of ${data.quantity}`);
      setRsp(false);
      return;
    }

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

    try {
      const res = await axios.post('http://localhost:3000/confirm-order',item);
      if (res.data) {
        localStorage.setItem('orderData', JSON.stringify({ name: name_, phone: num, item: data.name, price, quantity, av_quantity: data.quantity, address: addr, file: data.file }));

        alert("Order confirmed. Proceed to Payment.");
        setUi(true);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
    setRsp(false);
  };
  
  const handleCashOnDelivery=async()=>{
    const res=await axios.post('http://localhost:3000/handle-cash-on-delivery',{item:localStorage.getItem('orderData')})
    if(res.data){
      navigate('/main_home')
    }
  }

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/create-order", { price: price,orderData:localStorage.getItem('orderData')}); // Converting to paise
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        alert('Failed to load Razorpay script. Please try again.');
        return;
      }

      const options = {
        key: "rzp_test_mzNTcsoUKTuELO",  // Your Razorpay Test Key
        amount: price, // Price in paise
        currency: "INR",
        name: "FoodOrdering Service",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: function (response) {
          const audio=new Audio(notificationSound)
          audio.play()
          navigate('/main_home')
        },
        theme: { color: "#1976D2" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {ui_ ? (<>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          {rsp ? "Processing..." : `Pay Now ₹${price || data.price}`}
        </button>
        <button onClick={handleCashOnDelivery}>Cash on delivery</button>

        {/* <audio src={notificationSound}></audio> */}

        </>
      ) : (
        data.quantity > 0 ? (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Order Information</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                onChange={(e) => setNum(e.target.value)}
                type="text"
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                onChange={(e) => setAddr(e.target.value)}
                type="text"
                placeholder="Enter home address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={data.name}
                disabled
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
              <input
                value={price || data.price}
                disabled
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
              <input
                required
                placeholder="Enter quantity"
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-gray-600">Available Quantity: {data.quantity}</div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-full shadow-md hover:bg-green-700 transition"
              >
                {rsp ? "Processing..." : "Confirm Order"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-red-100 text-red-800 border border-red-400 rounded-md p-6 text-center mt-4">
            Sorry! Item is not available. It will be available soon!
          </div>
        )
      )}
    </div>
  );
}

export default OrderPanel;
