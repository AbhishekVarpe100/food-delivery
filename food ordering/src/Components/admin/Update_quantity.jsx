import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Update_quantity() {
  const {id}=useParams();
  const [data,setData]=useState({});
  const [quantity,setQuantity]=useState("");
  const [msg,setMsg]=useState('');
  const navigate=useNavigate();

  const getData=async()=>{
    const res=await axios.get('http://localhost:3000/get-item',{params:{id}})
    setData(res.data)

  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const res=await axios.put('http://localhost:3000/update-quantity',{ quantity,id,av_quantity:data.quantity })
      if(res.data=='updated'){
        setMsg('Quantity updated')
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
      Quantity updated
    </div>
  ) : null}

  <div className="text-gray-800 text-lg font-semibold">
    Food item: {data.name}
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      required
      onChange={(e) => setQuantity(e.target.value)}
      placeholder="Enter the quantity to update"
      type="text"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <input
      type="submit"
      value="Update Quantity"
      className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
    />
  </form>
</div>

  )
}

export default Update_quantity;