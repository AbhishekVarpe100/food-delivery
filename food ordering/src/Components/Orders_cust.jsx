import React, { useState, useEffect } from 'react'
import axios from 'axios';
function Orders_cust() {
  const [data,setdata]=useState([]);


  const getData=async()=>{
    const res=await axios.get('http://localhost:3000/get-orders',{params:{username:localStorage.getItem('username')}})
    setdata(res.data)

  }

  useEffect(()=>{
    getData();
  },[])
  
  return (
<div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-green-300">
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Item Name</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Quantity</th>
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-medium">Total Price</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-green-100"
            } hover:bg-green-200`}
          >
            <td className="border border-gray-300 px-4 py-2">{item.item_name}</td>
            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
            <td className="border border-gray-300 px-4 py-2">{item.price}</td>
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