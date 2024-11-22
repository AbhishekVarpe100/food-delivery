import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from'react-router-dom'
function Available() {

  const [data,setData]=useState([]);
  const [delete_,setDelete]=useState(false);

  async function getData(){
    const res=await axios("http://localhost:3000/get-data");
    setData(res.data)
  }

  const handlDelete=async(id)=>{
    const res=await axios.delete('http://localhost:3000/delete-item/'+id)
    if(res.data=='deleted'){
      setDelete(prev=>!prev)
    }
  }

useEffect(()=>{
  getData();
},[delete_])

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">

      
      <div>Total items are {data.length}</div>
  {data.length > 0 ? (
    
    data.map((item) => (
      <div
        key={item._id}
        className="bg-white shadow-lg rounded-lg overflow-hidden w-64 transform transition duration-300 hover:scale-105"  
      >
        <img loading='lazy'
          src={`http://localhost:3000/Food_Images/${item.file}`}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
          <div className="text-gray-600 mt-2">
            <span className="font-bold">Price :</span> {item.price}
          </div>
          <div className="text-gray-600">
            <span className="font-bold">Quantity Available :</span> {item.quantity}
          </div>
          <div>
            <button onClick={()=>handlDelete(item._id)} className='bg-red-600 transition duration-300 rounded-lg hover:bg-red-500 m-2 text-white px-2'>Delete</button><br />
            <Link className='bg-blue-600 transition duration-300 rounded-lg hover:bg-blue-500 text-white px-2' to={`/admin/update-price/${item._id}`}>Update Price</Link><br />
            <br />
            
            <Link className='bg-blue-600 transition duration-300 rounded-lg hover:bg-blue-500 text-white px-2' to={`/admin/update-quantity/${item._id}`}>Update Quantity</Link>
          </div>
        </div>
      </div>
    ))  
   ) : (
    <div className="text-gray-500 text-lg font-semibold mt-8">No food items are found </div>
  )}
</div>

  )
}

export default Available;