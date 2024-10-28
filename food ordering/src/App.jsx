import { useState } from 'react'
import NavBar from './NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import './index.css'
import Home_main from './Components/Home_main'
function App() {

  return (
    <>


    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/main_home' element={<Home_main></Home_main>} ></Route>
    </Routes>

    </BrowserRouter>
      
    </>
  )
}

export default App
