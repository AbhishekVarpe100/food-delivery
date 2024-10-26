import React, { useState } from 'react'
import './CSS/Animation.css'
function Login() {

  const [user,setUser]=useState({
    username:'',
    password:'',
  })


  const handleChange=async(e)=>{
    const {name,value}=await e.target;
    setUser({...user,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(user)

  }

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 z-0 bg-gray-100">
      <div className="ball bg-red-500"></div>
      <div className="ball bg-blue-500"></div>
      <div className="ball bg-green-500"></div>
      <div className="ball bg-yellow-500"></div>
      <div className="ball bg-purple-500"></div>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="relative z-10 max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4">
      <strong>Login</strong>
      <input
        required
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

     

      <input
        required
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="submit"
        value="Login"
        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
      />
    </form>
    </div>
  
  )
}

export default Login;