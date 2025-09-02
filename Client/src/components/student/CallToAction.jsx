import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl dark:text-white'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 dark:text-gray-400 sm:text-sm text-center'>
        {/* Using more relevant placeholder text */}
        Explore a vast library of courses taught by industry experts. Start your learning journey with us today.
      </p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors'>Get started</button>
        <button className='flex items-center gap-2 dark:text-white'>Learn more<img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

// FIX: Added the missing export statement.
export default CallToAction