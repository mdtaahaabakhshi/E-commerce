import React from 'react'
import { useState } from 'react'
const Login = () => {
   const [currentState, setCurrentState] = useState("Sign up")
 
   const handleSubmit = (e) => {
    e.preventDefault()
   }
  return (
<form action="" onSubmit={handleSubmit} 

className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
  <div className='inline-flex items-center gap-2 mb-2 mt-10'>
    <p className='prata-regular text-3xl'>{currentState}</p>
    <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
  </div> 
  
  { currentState === "Login" ? '' : 
  <input type="text"  name='' className='w-full px-3 py-2 border border-gray-800' placeholder="Name" id=""  required/>
  }
  <input type="email" name='' className='w-full px-3 py-2 border border-gray-800' placeholder="Email" id=""  required/>
  <input type="password" name='' className='w-full px-3 py-2 border border-gray-800' placeholder="Password" id="" required />
  <div className='w-full flex justify-between text-sm mt-[-8px]'>
    <p className='cursor-pointer'>Forgot your password</p>
    {
      currentState === "Login" ? 
      <p className='cursor-pointer' onClick={() => setCurrentState("Sign up")}>Create an account</p> : 
      <p className='cursor-pointer' onClick={() => setCurrentState("Login")}>Already have an account?</p>
    }
  </div>
<button className='bg-black text-white font-light rounded-md px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'} </button>
</form>
)
}

export default Login 