import React from 'react'
import {assets} from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Navbar = ( {setIsLoggedIn}) => {
const handleLogout = async () => {

  const response=  await axios.post(backendUrl + "/api/user/logoutAdmin",{}, { withCredentials: true });
     setIsLoggedIn(false)// This will show the login page
if(response.data.success){
  toast.success(response.data.message)
}

  }
  
  return (
<div className='flex items-center py-2 px-[4%] justify-between'>
        <img
            src={assets.logo}
            className="w-[max(10%,80px)]"
            alt=""
        />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'onClick={handleLogout} >Logout</button>
        
    </div>
  )
}

export default Navbar