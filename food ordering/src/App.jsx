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
import Cart from './Components/Cart'
import Available_Items from './Components/Available_Items'
import Orders_cust from './Components/Orders_cust'
import Item from './Components/Item'
function App() {

  return (
    <>


    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>


      <Route path='/main_home' element={<Home_main></Home_main>} >
      <Route index element={<Available_Items></Available_Items>}></Route>
      <Route path='orders' element={<Orders_cust></Orders_cust>}></Route>  
      <Route path='/main_home/:id' element={<Item></Item>}></Route>
      {/* Nested routes */}
      </Route>


      <Route path='/cart' element={<Cart></Cart>}></Route>


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
