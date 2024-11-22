import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Update_Price() {
  const {id}=useParams();
  const [data,setData]=useState({});
  const [price,setPrice]=useState("");
  const [msg,setMsg]=useState('');
  const navigate=useNavigate();

  const getData=async()=>{
    const res=await axios.get('http://localhost:3000/get-item',{params:{id}})
    setData(res.data)

  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const res=await axios.put('http://localhost:3000/update-price',{ price,id,prev_price:data.price })
      if(res.data=='updated'){
        setMsg('Price updated')
        setTimeout(()=>{
          setMsg("")
          setTimeout(()=>{
            navigate('/admin')
          },1000)
        },3000)
      }
  }


  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
  {msg ? (
    <div className="text-green-600 font-medium">
      Price updated
    </div>
  ) : null}

  <div className="text-gray-800 text-lg font-semibold">
    Food item: {data.name}
  </div>
  <div>Old price : {data.price} Rs.</div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      required
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Enter the new price of item"
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <input
      type="submit"
      value="Update Price"
      className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
    />
  </form>
</div>

  )
}

export default Update_Price;