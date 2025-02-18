import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GrLike } from "react-icons/gr";
import axios from 'axios'

function Suggestions() {

    const [suggestion,setSuggestion]=useState("")
    const [data,setData]=useState([])
    const [dataOther,setDataOthers]=useState([])
    const [render,setRender]=useState(false)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/add-suggestion',{username:localStorage.getItem('username'),suggestion}).then(res=>{
            if(res.data=='added'){
                alert("Posted")
                setRender(prev=>!prev)
                setSuggestion("")
            }
        })
    }
  
    const handleDelete=async(id)=>{
        const res=await axios.delete(`http://localhost:3000/delete-suggestion/${id}`)
        if(res.data){
            setRender(prev=>!prev)
        }
    }

    const handleLike=async(id)=>{
      const res=await axios.post('http://localhost:3000/like-suggestion',{id,username:localStorage.getItem('username')})

      if(res.data){
        setRender(prev=>!prev)
      }

    }

    useEffect(()=>{
        async function getSuggestions(){
            axios.get('http://localhost:3000/get-suggestions',{params:{username:localStorage.getItem('username')}}).then(res=>setData(res.data)).catch(err=>console.log(err))
        }
        async function getSuggestionsOthers(){
            axios.get('http://localhost:3000/get-suggestions-others',{params:{username:localStorage.getItem('username')}}).then(res=>setDataOthers(res.data)).catch(err=>console.log(err))
        }
        getSuggestions()
        getSuggestionsOthers()
    },[render])

  return (
    <>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Post Suggestions</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
        <textarea value={suggestion}
            required
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter your suggestion..."
            rows={6}
        ></textarea>

        <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition duration-300"
        >
            Post
        </button>
    </form>
</div>

<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  {/* Your Suggestions Section */}
  <div className="border-b pb-4 mb-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Suggestions</h2>
    {data.length !== 0 ? (
      <div className="space-y-4">
        {data.map((suggestion) => (
          <div
            key={suggestion._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 w-full overflow-hidden break-words"
          >
            <p className="text-gray-700">{suggestion.suggestion}</p>
            <div>Reply : {suggestion.reply?suggestion.reply:<>-</>}</div>
            <hr />
            <div>Posted At : {suggestion.createdAt}</div>

            <button
  onClick={() => handleDelete(suggestion._id)}
  className="mt-1 px-2 py-1 text-xs font-bold m-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
>
  Delete
</button> 
<Link
  className="mt-1 px-2 py-1 text-xs font-bold m-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  to={`/main_home/suggestions/edit/${suggestion._id}`}
>
  Edit
</Link>

<button onClick={()=>handleLike(suggestion._id)}><GrLike></GrLike></button>
<div>Likes : {suggestion.likes}</div>

          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No suggestions found</p>
    )}
  </div>
  {/* Other Suggestions Section */}
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-3">Other Suggestions</h2>
    {dataOther.length !== 0 ? (
      <div className="space-y-4">
        {dataOther.map((suggestion) => (
          <div
            key={suggestion._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50 w-full overflow-hidden break-words"
          >
            <p className="text-gray-700 font-semibold">
              Suggested by : <span>{suggestion.username}</span>
            </p>
            <p className="text-gray-600 mt-1">
              <span>Description :</span> {suggestion.suggestion}
              <div>Reply : {suggestion.reply?suggestion.reply:<>-</>}</div>
              <hr />

            <div>Posted At : {suggestion.createdAt}</div>
            </p>
            <button onClick={()=>handleLike(suggestion._id)}><GrLike></GrLike></button>
            <div>Likes : {suggestion.likes}</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No other suggestions found</p>
    )}
  </div>
</div>
</>
  )
}

export default Suggestions;