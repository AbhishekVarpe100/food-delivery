import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Outlet } from "react-router-dom";
const Home_main=()=>{

    const [token,setToken]=useState(localStorage.getItem('token'))
    const [isValid,setIsValid]=useState(true);
    const [isTokenPresent,setIsTokenPresent]=useState(true);
    const [authData,setAuthData]=useState([])

    const checkUserValid=async()=>{
        try{
            const res= await axios.get('http://localhost:3000/gethome',{params:{token}})
            if(res.data.msg=='token not present'){
                setIsTokenPresent(false)
            }
            else if(res.data.msg=='invalid token'){
                setIsValid(false)
                localStorage.removeItem('username');
                localStorage.removeItem('email')
            }
            else if(res.data.msg=='profile accessed'){
                setIsValid(true)
                setAuthData(res.data.authData)
            }
    }
    catch(error){
        console.log(error)
    }
}

    useEffect(()=>{
        checkUserValid();
    },[])

    return (
        <div >
  {!isTokenPresent ? (
    <p className="text-red-600 font-semibold text-lg">
      You can't access this page without registering or logging in <Link to="/register" className="text-blue-600 underline hover:text-blue-800 mx-5">
        Register
      </Link>
       <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
        Log In
      </Link>
    </p>
  ) : isValid ? (
    <>

<div className="flex justify-center space-x-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20">
  <Link
    to="/main_home"
    className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
  >
    Available Items
  </Link>

  <Link
    to="/main_home/orders"
    className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
  >
    Your Orders
  </Link>
  <Link
    to="/main_home/fav"
    className="text-white font-bold py-2 px-6 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300 shadow-sm"
  >
    Favorite Items
  </Link>
</div>

    <div>
      <Outlet></Outlet>
    </div>
    
    
    
    
    
    </>
  ) : (
    <p className="text-yellow-600 text-lg font-medium">
      Your session has expired.{" "}
      <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
        Log In
      </Link>{" "}
      again to continue.
    </p>
  )}
</div>

    )
}

export default Home_main;