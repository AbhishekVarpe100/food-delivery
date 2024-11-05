import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function NavBar(){

  const [username,setUser]=useState(localStorage.getItem('username'));
  const navigate=useNavigate();

  const handleLogOut=()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('email')
    setTimeout(()=>{
      navigate('/login')
      setTimeout(()=>{
        window.location.reload();
      },500)
    },1000)
  }

  
    return (

        <nav className="bg-green-500 p-4 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
       
          <a href="#" className="text-white font-bold text-xl">FoodOrderingPlatform.com</a>

          <div className="space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 font-medium transition duration-300">Home</Link>
            {username?<Link onClick={handleLogOut}  className="text-white hover:text-gray-200 font-medium transition duration-300">Log out</Link> :<><Link to="/login" className="text-white hover:text-gray-200 font-medium transition duration-300">Login</Link> <Link to="/register" className="text-white hover:text-gray-200 font-medium transition duration-300">Register</Link> </>}
            
            
            
          </div>
        </div>
      </nav>
      

    )
}

export default NavBar;
