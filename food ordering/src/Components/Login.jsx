import React, { useState } from 'react'
import './CSS/Animation.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {

  const [user,setUser]=useState({
    username:'',
    password:'',
  })
  const [success,setSuccess]=useState('')
  const navigate=useNavigate();


  const handleChange=async(e)=>{
    const {name,value}=await e.target;
    setUser({...user,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    try{
      const res=await axios.post('http://localhost:3000/login',user);
      localStorage.setItem('token',`bearer ${res.data.token}`)
      localStorage.setItem('username',res.data.username)
      localStorage.setItem('email',res.data.email)
      if(res.data.message=='login successful'){
        setSuccess('Login successful')
        setTimeout(()=>{
          setSuccess('')
          setTimeout(()=>{
            navigate('/main_home')
            setTimeout(()=>{
              window.location.reload()
            },2000)
          },1000)
        },4000)
      }
      
    }
    catch(error){
      alert(error)

    }

  }

  return (
    <div className="flex items-center bg-slate-200 justify-center min-h-screen relative overflow-hidden">
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
      {success?success:null}
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