import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Orders_cust() {
  const [data,setdata]=useState([]);
  const [success,setSuccess]=useState(false);


  const getData=async()=>{
    const res=await axios.get('http://localhost:3000/get-orders',{params:{username:localStorage.getItem('username')}})
    setdata(res.data)

  }

  const handleDelete=async(id)=>{
    const res=await axios.delete(`http://localhost:3000/delete-order/${id}`)
    if(res.data=='deleted'){
      setSuccess(prev=>!prev)
    }
  }

  useEffect(()=>{
    getData();
  },[success])
  
  return (
<div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-blue-300">
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Item Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Quantity</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Total Price</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Action</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-blue-100"
            }`}
          >
            <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
            <td className="border border-gray-300 px-4 py-2">{item.price}</td>

            <td>
  <button 
    onClick={() => handleDelete(item._id)} 
    className="transition duration-300 hover:bg-red-600 bg-red-500 font-medium px-3 py-1 text-sm rounded-md text-white"
  >
    Delete
  </button>
</td>

          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="3"
            className="border border-gray-300 px-4 py-2 text-center text-gray-500"
          >
            You have not ordered anything yet...!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  )
}

export default Orders_cust;