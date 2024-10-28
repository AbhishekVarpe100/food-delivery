import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
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
    <h1 className="text-green-600 text-2xl font-bold mx-5">Welcome to the home</h1>
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