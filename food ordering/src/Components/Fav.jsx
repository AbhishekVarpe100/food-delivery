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
      <p className="text-center text-gray-500">No favorite items added</p>
    )}
  </div>
  )
}

export default Fav;