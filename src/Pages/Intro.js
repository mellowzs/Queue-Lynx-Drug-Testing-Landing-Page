import React from 'react'
import Doc from '../Assets/Intro.png'
function Intro() {
  return (
    <div className='h-full mt-20'>
        <h1 className='text-4xl sm:text-xl font-bold text-center text-white py-8 px-11'>
          Welcome to Queue Lynx Drug Testing
        </h1>
        <div className='flex'>
            <img src={Doc} alt="Intro" className='h-[550px] sm:h-[200px] pl-48 sm:pl-6' />
            <div className='flex flex-col'>
              <p className='text-white text-xl sm:text-xs text-pretty px-48 sm:px-6 py-20 sm:py-1 mt-28 sm:mt-4 text-justify'>
                Queue Lynx is dedicated to providing efficient and reliable drug testing services.
              </p>
              <button className='bg-white text-black font-bold py-2 sm:mt-10 px-4 rounded-lg mx-auto'>
                Get Started
              </button>
            </div>
        </div>
    </div>
  )
}

export default Intro;