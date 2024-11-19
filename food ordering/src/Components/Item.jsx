import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'

import axios from 'axios'
function Item() {
    const {id}=useParams();
const [data,setData]=useState([]);


    const getData=async()=>{
      const res=await axios.get('http://localhost:3000/get-item',{params:{id}})
        setData([res.data])
    }

    useEffect(()=>{
      getData();
    },[])

  return (
    <div>
      {data?<>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
  {data.map((ele) => (
    <div
      key={ele._id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 transform transition duration-300 hover:shadow-xl hover:-translate-y-2"
    >
      <div className="relative">
        <img
          src={`http://localhost:3000/Food_Images/${ele.file}`}
          alt={ele.name}
          className="w-full h-auto object-contain bg-gray-100"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{ele.name}</h3>
        <p className="mt-2 text-gray-500">
          <span className="font-medium">Price:</span>  {ele.price} Rs.
        </p>
        <p className="mt-1 text-gray-500">
          <span className="font-medium">Quantity:</span> {ele.quantity} Items
        </p>
       <Link to={`/main_home/order/${ele._id}`}> <button className="mt-5 w-full bg-gradient-to-r from-green-400 to-green-700 text-white font-medium py-2 rounded-full shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
  Order Now
</button></Link>

      </div>
    </div>
  ))}
</div>

      
      </>:null}
    </div>
  )
}

export default Item;