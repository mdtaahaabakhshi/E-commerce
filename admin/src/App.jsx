import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    
    <div className='bg-gray-50 min-h-screen'>
    <Navbar/>
    <Sidebar/>
    <hr />
    <div className='flex w-full'></div>
    </div>
  )
}

export default App