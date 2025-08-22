import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div>
        <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
          <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 
          md:gap-32 py-10 border-b border-white/30'>
            <div className='flex flex-col md:items-start items-center w-full'>
             
              <img src={assets.logo} alt="logo" className="w-24 md:w-28" />
              <p className='mt-6 text-center md:text-left text-sm text-white/80 '>Lorem Ipsum is simply dummy text of the 
              printing  and typesetting industry. Lorem Ispum has been the industry's standard dummy text.</p>
                
               
                
            </div>
            <div className='flex flex-col md:items-start items-center w-full'>
              <h2 className='font-semibold text-white mb-5'>Company</h2>
              <ul className='whitespace-nowrap flex md:flex-col w-full justify-between text-sm text-white/80 space-y-2'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About us</a></li>
                <li><a href='#'>Conatct us</a></li>
                <li><a href='#'>Privacy policy</a></li>
                
              </ul>
            </div>
            <div className='hidden md:flex flex-col md:items-start w-full'>
              <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
              <p className='text-sm text-white/80 '>The latest news, articles, and resources, sent to your inbox weekly.</p>
              
              <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full md:w-80 px-4 py-2 rounded-md mt-3 text-sm"
                    />
                    <button
                      className="mt-4"
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                    </button>
              </div>

            </div>
          </div>
          <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025 @EduLearn Pro. All Right Reserved.</p>
        </footer>
    </div>
  )
}

export default Footer