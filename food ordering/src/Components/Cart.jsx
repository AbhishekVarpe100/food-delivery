import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [data, setData] = useState([]);
  const [render,setRender]=useState(false)

  async function getData() {
    const res = await axios.get("http://localhost:3000/get-cart", {
      params: { username: localStorage.getItem("username") },
    });
    setData(res.data);
  }

  async function handleDelete(id){
    const res=await axios.delete('http://localhost:3000/remove-cart/'+id)
    if(res.data='deleted'){
      setRender(prev=>!prev)
    }
  }

  useEffect(() => {
    getData();
  }, [render]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      {data.length === 0 ? (
        <div className="text-gray-500 text-lg font-medium">
          No items in the cart
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm font-medium">
                <th className="p-4 border border-gray-200">Image</th>
                <th className="p-4 border border-gray-200">Item Name</th>
                <th className="p-4 border border-gray-200">Price</th>
                <th className="p-4 border border-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele) => (
                <tr key={ele._id} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-200">
                    <img
                      src={`http://localhost:3000/Food_Images/${ele.file}`}
                      alt="A food item"
                      className="w-16 hover:scale-105 hover:cursor-pointer transition duration-500 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border border-gray-200">{ele.name}</td>
                  <td className="p-4 border border-gray-200 text-green-600 font-semibold">
                    {ele.price} Rs.
                  </td>
                  <td className="p-4 border border-gray-200 text-green-600 font-semibold">
                    <button onClick={()=>handleDelete(ele._id)} className="bg-red-400 text-white rounded-md p-2">Remove Item</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cart;
