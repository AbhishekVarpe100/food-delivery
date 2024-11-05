import React, { useState } from 'react'
import './CSS/Animation.css'
import axios from 'axios'

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState([])
  const [exist,setExist]=useState('')
  const [success,setSuccess]=useState('')
  const [rateLimit,setRateLimit]=useState('');

  const handleChange =  (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  

    try{
    const res = await axios.post('http://localhost:3000/register', user)
    if(res.data.errors){

      setErrors(Array.isArray(res.data.errors) ? res.data.errors : [])
    }
    
    else if(res.data.msg){
      setExist("Username or email already exist");
      setTimeout(()=>{
        setExist('')
      },4000)
    }
    else if(res.data.register){
      setSuccess("Registered successfully")
      setTimeout(()=>{
        setSuccess('')
        setUser({username:"",email:"",password:""})
      },4000)
    }
  }
  catch(error){

   setRateLimit(<b>Too many requests! please try after 5 minutes</b>)

   setTimeout(()=>{
    setRateLimit('');
   },4000)
    
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
        <strong>Register</strong>

        {/* Username Input */}
        {exist ? (
  <div className="w-full p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
    {exist} 
  </div>
) : (
  success && (
    <div className="w-full p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded-lg" role="alert">
      {success}
    </div>
  )
)}

{rateLimit ? (
  <div className="w-full p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
    {rateLimit}
  </div>
) : null}


        <input value={user.username}
          required
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.map((err, index) => 
          err.path === 'username' ? (
            <div key={index} className="text-red-500 text-sm mt-1 pl-1">
              {err.msg}
            </div>
          ) : null
        )}

        {/* Email Input */}
        <input value={user.email}
          required
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {errors.map((err, index) => 
          err.path === 'email' ? (
            <div key={index} className="text-red-500 text-sm mt-1 pl-1">
              {err.msg}
            </div>
          ) : null
        )}

        {/* Password Input */}
        <input value={user.password}
          required
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.map((err, index) => 
          err.path === 'password' ? (
            <div key={index}
            className="text-red-500 text-sm mt-1 pl-1"
            style={{ opacity: errors.length ? 1 : 0 }}>
              {err.msg}
            </div>
          ) : null
        )}

        {/* Submit Button */}
        <input
          type="submit"
          value="Register"
          className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
        />
      </form>
    </div>
  )
}

export default Register
