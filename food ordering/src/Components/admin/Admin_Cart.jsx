import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
function Admin_Cart(){

    const [data,setData]=useState([]);


    const getData=async()=>{
        const res=await axios.get('http://localhost:3000/get-admin-cart')
        setData(res.data)
    }


useEffect(()=>{
    getData()
},[])
    return(
        <div>
           {data.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
          
        </tr>
      </thead>
      <tbody>
        {data.map((username, index) => (
          <tr key={index} className="hover:bg-gray-100">
           <Link title={`Username : ${username}`} to={`/admin/cart/${username}`}><td className="border border-gray-300 px-4 py-2"> <b className='text-blue-500 underline hover:text-blue-400'>{username}</b> </td></Link> 
          </tr>
        ))} 
      </tbody>
    </table>
  </div>
) : (
  <div className="text-center mt-4 text-gray-500">No users found</div>
)}

        </div>
    )
}

export default Admin_Cart;  