import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Add_item from '../admin/Add_item'
import Orders from '../admin/Orders'

function Admin_routes() {
  return (
    

    <Routes>
        <Route path='add_item' element={<Add_item></Add_item>}></Route>
        <Route path='orders' element={<Orders></Orders>}></Route>
    </Routes>
    
    

  )
}

export default Admin_routes