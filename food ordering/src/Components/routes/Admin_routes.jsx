import React, { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Add_item from '../admin/Add_item'
import Orders from '../admin/Orders'
import Admin_Cart from '../admin/Admin_Cart'
import UserCart from '../admin/UserCart'

function Admin_routes() {

  const [data,setData]=useState([])
  return (
    

    <Routes>
        <Route path='add_item' element={<Add_item></Add_item>}></Route>
        <Route path='orders' element={<Orders></Orders>}></Route>
        <Route path='cart' element={<Admin_Cart></Admin_Cart>}></Route>
        <Route path='cart/:username' element={<UserCart></UserCart>}></Route>
    </Routes>
    
    

  )
}

export default Admin_routes