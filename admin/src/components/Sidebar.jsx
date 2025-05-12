import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div>
        <div>
<NavLink to="/add" className='flex items-center gap-3  border border-gray-300 border-r-0 px-3 py-2 rounded-l '>
<img src={assets.add_icon} alt="" className='w-5 h-5 ' />
<p className='hidden md:block'>Add</p>
</NavLink>

        </div>
    </div>
  )
}

export default Sidebar