import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Item() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const navigate=useNavigate()

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
      setTimeout(()=>{
        navigate(-1) 
      },2000)
    }
  };

  useEffect(() => {
    getData();
  }, [render]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {data.map((ele) => (
            <div
              key={ele._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={`http://localhost:3000/Food_Images/${ele.file}`}
                  alt={ele.name}
                  className="w-full h-64 object-cover bg-gray-100"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">{ele.name}</h3>
                <p className="text-gray-500">
                  <span className="font-medium">Price:</span> {ele.price} Rs.
                </p>
                <p className="text-gray-500">
                  <span className="font-medium">Quantity:</span> {ele.quantity} Items
                </p>
                
                <div>{ele.quantity<=5?<>Hurry up limited quantity left</>:null}</div>

                <div className="space-y-2">
                  <Link to={`/main_home/order/${ele._id}`}>
                    <button className="w-full bg-gradient-to-r from-green-400 to-green-700 text-white font-medium py-2 rounded-full shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Order Now
                    </button>
                  </Link>

                  {ele.cart_status == "added" ? (
                    <span className="block text-center text-green-600 font-medium px-2 py-1 bg-green-100 rounded-md">
                      Item added to cart
                    </span>
                  ) : (
                    <button
                      className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-colors duration-200"
                      onClick={() => handleCart(ele._id)}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Item;
