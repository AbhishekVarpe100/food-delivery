import { useState } from 'react'
import NavBar from './NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import './index.css'
import Home_main from './Components/Home_main'
import Admin from './Components/admin/Admin'
import Add_item from './Components/admin/Add_item'
import Orders from './Components/admin/Orders'
import Admin_routes from './Components/routes/Admin_routes'
import Available from './Components/admin/Available'
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


{/* nested routes for admin */}
      <Route path='/admin' element={<Admin></Admin>}>
      <Route path="/admin/*" element={<Admin_routes></Admin_routes>}></Route>
      <Route index element={<Available></Available>}></Route>   {/* defeult route */}
      
      </Route>



    </Routes>

    </BrowserRouter>
      
    </>
  )
}

export default App
