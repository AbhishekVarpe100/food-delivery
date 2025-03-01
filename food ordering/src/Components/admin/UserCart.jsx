import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect,useState } from 'react';
function UserCart() {
    const {username}=useParams()
    const [data,setData]=useState([])

    const getData=async()=>{
        const res=await axios.get('http://localhost:3000/get-data-by-username',{params:{username}})
        setData(res.data)
    }



    useEffect(()=>{
        getData()
    },[])
  return (
    <>
    <div className="p-6">
  <div className="text-lg font-bold mb-4">
    Cart items added by user: <span className="text-yellow-500">{username}</span>
    <div>Total items : {data.length}</div>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Item Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Price</th>
          <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Image</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr title={item.name}
            key={item._id}
            className={`hover:bg-gray-100 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="px-6 py-3 text-gray-800 text-sm border border-gray-300">
              {item.name}
            </td>
            <td className="px-6 py-3 text-gray-800 text-sm border border-gray-300">
              {item.price} Rs.
            </td>
            <td className="px-6 py-3 text-center border border-gray-300">
              <img
                src={`http://localhost:3000/Food_Images/${item.file}`}
                alt="Item"
                className="h-16 w-16 object-cover rounded-lg border border-gray-200"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </>
  )
}

export default UserCart;