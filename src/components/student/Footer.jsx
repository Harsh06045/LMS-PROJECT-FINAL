import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Add your subscription logic here
      console.log('Subscribing email:', email)
      alert('Thank you for subscribing!')
      setEmail('')
    } else {
      alert('Please enter a valid email address')
    }
  }

  const handleNavigation = (section) => {
    // Add your navigation logic here
    console.log('Navigating to:', section)
    // You can use react-router or scroll to section
  }

  return (
    <div>
      <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
        <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 
        md:gap-32 py-10 border-b border-white/30'>
          
          {/* Logo and Description Section */}
          <div className='flex flex-col md:items-start items-center w-full'>
            <img src={assets.logo} alt="logo" className="w-24 md:w-28" />
            <p className='mt-6 text-center md:text-left text-sm text-white/80 max-w-xs'>
              EduLearn Pro redefines learning with a sleek, smart platform that turns knowledge into power—anytime, anywhere.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className='flex flex-col md:items-start items-center w-full'>
            <h2 className='font-semibold text-white mb-5'>Company</h2>
            <ul className='flex md:flex-col w-full justify-between md:justify-start text-sm text-white/80 space-y-0 md:space-y-2 gap-4 md:gap-0'>
              <li>
                <button 
                  onClick={() => handleNavigation('home')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className='hover:text-white transition-colors duration-200'
                >
                  About us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Contact us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('privacy')}
                  className='hover:text-white transition-colors duration-200'
                >
                  Privacy policy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription Section */}
          <div className='flex md:hidden lg:flex flex-col md:items-start items-center w-full'>
            <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
            <p className='text-sm text-white/80 mb-4 text-center md:text-left'>
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            
            <form onSubmit={handleSubscribe} className='w-full'>
              <input
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-80 px-4 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto mt-3 px-6 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Mobile Newsletter Section */}
          <div className='flex md:hidden lg:hidden flex-col items-center w-full'>
            <h2 className='font-semibold text-white mb-3'>Newsletter</h2>
            <form onSubmit={handleSubscribe} className='w-full max-w-sm'>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full mt-3 px-6 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <p className='py-4 text-center text-xs md:text-sm text-white/60'>
          Copyright 2025 © EduLearn Pro. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
