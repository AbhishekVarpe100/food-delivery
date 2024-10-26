import React from 'react'
import girl from './girl.jpg'
function Home() {
  return (
    <div style={{backgroundImage:`url(${girl})`,backgroundSize: 'cover', height: '100vh', opacity:'50%'}} className='text-green-400'>Home</div>
  )
}

export default Home;