import React, { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Add_item from '../admin/Add_item'
import Orders from '../admin/Orders'
import Admin_Cart from '../admin/Admin_Cart'
import UserCart from '../admin/UserCart'
import AdminSuggestions from '../admin/AdminSuggestions'
import { Reply } from 'lucide-react'
import ReplyToSuggestion from '../admin/ReplyToSuggestion'

function Admin_routes() {

  const [data,setData]=useState([])
  return (
    

    <Routes>
        <Route path='add_item' element={<Add_item></Add_item>}></Route>
        <Route path='orders' element={<Orders></Orders>}></Route>
        <Route path='cart' element={<Admin_Cart></Admin_Cart>}></Route>
        <Route path='cart/:username' element={<UserCart></UserCart>}></Route>
        <Route path='suggestions' element={<AdminSuggestions></AdminSuggestions>}></Route>
        <Route path='suggestions/reply/:id' element={<ReplyToSuggestion></ReplyToSuggestion>}></Route>
    </Routes>
    
    

  )
}

export default Admin_routes