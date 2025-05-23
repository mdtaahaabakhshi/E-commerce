import React from 'react'

export const NewsLetter = () => {
const SubmitHandler =(e)=>{
e.preventDefault();
}

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, culpa.</p>
        <form onSubmit={SubmitHandler} className='w-full sm:w-1/2 flex items-center gap-2 mx-auto my-6 border pl-3' action="">
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your mail' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}
export default NewsLetter;