import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode on component mount and listen for changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    // Initial check
    handleThemeChange()

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Subscribing email:', email)
      alert('Thank you for subscribing!')
      setEmail('')
    } else {
      alert('Please enter a valid email address')
    }
  }

  const handleNavigation = (section) => {
    console.log('Navigating to:', section)
  }

  return (
    <div>
      <footer className={`md:px-36 text-left w-full mt-10 transition-colors duration-300 ${
        isDarkMode ? 'bg-black' : 'bg-gray-900'
      }`}>
        <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
          
          {/* Logo and Description Section */}
          <div className='flex flex-col md:items-start items-center w-full'>
            <img src={assets.logo} alt="logo" className="w-24 md:w-28" />
            <p className={`mt-6 text-center md:text-left text-sm max-w-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-white/80'
            }`}>
              EduLearn Pro redefines learning with a sleek, smart platform that turns knowledge into power—anytime, anywhere.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className='flex flex-col md:items-start items-center w-full'>
            <h2 className={`font-semibold mb-5 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              Company
            </h2>
            <ul className='flex md:flex-col w-full justify-between md:justify-start text-sm space-y-0 md:space-y-2 gap-4 md:gap-0'>
              {['Home', 'About us', 'Contact us', 'Privacy policy'].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavigation(item.toLowerCase().replace(' ', ''))}
                    className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription Section - Desktop/Tablet */}
          <div className='flex md:hidden lg:flex flex-col md:items-start items-center w-full'>
            <h2 className={`font-semibold mb-5 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              Subscribe to our newsletter
            </h2>
            <p className={`text-sm mb-4 text-center md:text-left transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-white/80'
            }`}>
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            
            <form onSubmit={handleSubscribe} className='w-full'>
              <input
                type="email"
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full md:w-80 px-4 py-2 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border border-gray-600 focus:ring-blue-400 placeholder-gray-400'
                    : 'bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-500'
                }`}
                required
              />
              <button
                type="submit"
                className={`w-full md:w-auto mt-3 px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'
                    : 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-blue-500'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Mobile Newsletter Section */}
          <div className='flex md:hidden lg:hidden flex-col items-center w-full'>
            <h2 className={`font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              Newsletter
            </h2>
            <form onSubmit={handleSubscribe} className='w-full max-w-sm'>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white border border-gray-600 focus:ring-blue-400 placeholder-gray-400'
                    : 'bg-white text-gray-900 focus:ring-blue-500 placeholder-gray-500'
                }`}
                required
              />
              <button
                type="submit"
                className={`w-full mt-3 px-6 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <p className={`py-4 text-center text-xs md:text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-white/60'
        }`}>
          Copyright 2025 © EduLearn Pro. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
