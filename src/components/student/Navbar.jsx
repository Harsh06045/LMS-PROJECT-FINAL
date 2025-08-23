import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')
  
  const { openSignIn } = useClerk()
  const { user } = useUser()
  
  // Theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Light mode icon (Sun)
  const SunIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="4" />
      <path d="M10 0v4M10 16v4M4.22 4.22l2.83 2.83M12.95 12.95l2.83 2.83M0 10h4M16 10h4M4.22 15.78l2.83-2.83M12.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  // Dark mode icon (Moon)
  const MoonIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 transition-colors duration-300 ${
        isCourseListPage 
          ? (isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white') 
          : (isDarkMode ? 'bg-gray-800' : 'bg-cyan-100/70')
      }`}
    >
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center">
        <img 
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      {/* Desktop Nav */}
      <div className={`hidden md:flex items-center gap-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        <div className="flex items-center gap-5">
          {user && (
            <> 
              <Link to="/educator">
                <button className={`hover:${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors`}>
                  Educator Dashboard
                </button>
              </Link>
              <Link to="/my-enrollments" className={`hover:${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors`}>
                My Enrollments
              </Link>
            </>
          )}
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:bg-opacity-80 ${
              isDarkMode 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden flex items-center gap-2 sm:gap-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <Link to="/educator">
                <button className={`hover:${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors text-xs`}>
                  Dashboard
                </button>
              </Link>
              <Link to="/my-enrollments" className={`hover:${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors text-xs`}>
                Enrollments
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-lg transition-all duration-300 hover:bg-opacity-80 ${
            isDarkMode 
              ? 'text-yellow-400 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="w-4 h-4">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </div>
        </button>
        
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}> 
            <img
              src={assets.user_icon}
              alt="User"
              className="w-8 h-8 rounded-full"
            />  
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
