import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Fav() {
    const [data,setData]=useState([])
    const [render,setRender]=useState(false)


    const getData=async()=>{
        const res=await axios.get('http://localhost:3000/get-fav',{params:{username:localStorage.getItem('username')}})
        setData(res.data)

    }
    const handleDelete=async(id)=>{


        const res=await axios.delete('http://localhost:3000/del-fav',{params:{id}})
        if(res.data){
            setRender(prev=>!prev)
        }
        

    }

    useEffect(()=>{
        getData()
    },[render])

  return (
    <div className="container mx-auto p-4">
      <center className='text-violet-500 font-bold'> <i>Favorite Items</i> </center>
       {data.length==0?null:<> Total favorite items : {data.length}</>}
    {data.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Image</th>
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Price</th>
              <th className="px-6 py-3 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">
                  <img
                    src={`http://localhost:3000/Food_Images/${item.file}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-3 border-b">{item.name}</td>
                <td className="px-6 py-3 border-b">{item.price} Rs.</td>
                <td className="px-6 py-3 border-b">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600"
                  > 
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-yellow-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M3.98 18h16.04a2 2 0 001.732-3l-8.02-14a2 2 0 00-3.464 0l-8.02 14A2 2 0 003.98 18z"></path>
        </svg>
        <p className="font-semibold">No favorite items found</p>
      </div>
      <p className="mt-2 text-sm">
        When you add favorite items, they will show here.
      </p>
    </div>
    )}
  </div>
  )
}

export default Fav;