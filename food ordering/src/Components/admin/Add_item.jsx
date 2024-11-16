import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Add_item() {

  const [data,setData]=useState({
    name:'',
    price:'',
    quantity:'',
  })
  const [file,setFile]=useState('')
  const [success,setSuccess]=useState('');
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    // console.log(file,food)

    const formData=new FormData();

    formData.append('food',data.name);
    formData.append('price',data.price)
    formData.append('quantity',data.quantity)
    formData.append('file',file)

    const res=await axios.post('http://localhost:3000/add-item',formData)
    if(res.data.msg=='added'){
      setSuccess("Added")
      setTimeout(()=>{setSuccess('')
      navigate('/admin')
    },3000)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-lg bg-white p-6 rounded-lg shadow-sm space-y-5"
  >
    {success && (
      <div className="text-center text-lg text-green-500 font-medium">{success}</div>
    )}

    <h2 className="text-xl font-semibold text-gray-700 text-center">Add Food Item</h2>

    <div className="flex flex-col space-y-4">
      <input
        name="name"
        required
        onChange={handleChange}
        type="text"
        placeholder="Food name"
        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <input
        type="text"
        name="price"
        required
        onChange={handleChange}
        placeholder="Food price"
        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <input
        type="text"
        name="quantity"
        required
        onChange={handleChange}
        placeholder="Quantity available"
        className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <input
        required
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        className="w-full px-2 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 file:bg-gray-100 file:py-1 file:px-3 file:border-0 file:text-gray-600 file:text-sm file:font-normal"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gray-700 text-white py-2 rounded focus:outline-none hover:bg-gray-800 transition duration-150"
    >
      Add Item
    </button>
  </form>
</div>

  )
}

export default Add_item;