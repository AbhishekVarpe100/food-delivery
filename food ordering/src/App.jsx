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
import Order_panel from './Components/Order_panel'
import Update_Price from './Components/admin/Update_Price'
import Update_quantity from './Components/admin/Update_quantity'
import Image from './Components/Image'
import Status from './Components/Status'
import Update_Status from './Components/admin/Update_Status'
import Reviews from './Components/Reviews'

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
      <Route path='/main_home/order/:id' element={<Order_panel></Order_panel>}></Route>
      <Route path='/main_home/orders/status/:id' element={<Status></Status>}></Route>
      <Route path='/main_home/reviews/:id' element={<Reviews></Reviews>}></Route>
      

      {/* Nested routes */}
      </Route>


      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/cart/:file' element={<Image></Image>}></Route>


{/* nested routes for admin */}
      <Route path='/admin' element={<Admin></Admin>}>
      <Route path="/admin/*" element={<Admin_routes></Admin_routes>}></Route>
      <Route index element={<Available></Available>}></Route>   {/* defeult route */}
      <Route path='/admin/update-price/:id' element={<Update_Price></Update_Price>}></Route>
      <Route path='/admin/update-quantity/:id' element={<Update_quantity></Update_quantity>}></Route>
      <Route path='/admin/orders/update-status/:id' element={<Update_Status></Update_Status>}></Route>

      </Route>



    </Routes>

    </BrowserRouter>
      
    </>
  )
}

export default App
