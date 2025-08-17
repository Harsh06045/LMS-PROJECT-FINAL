import React from 'react'
import assets from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img 
            src={assets.logo} 
            alt="Edemy" 
            className="h-8 w-auto cursor-pointer hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Navigation Links and Actions */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/educator" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
            >
              Become Educator
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/my-enrollments" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
            >
              My Enrollments
            </Link>
          </div>

          {/* Create Account Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Create Account
          </button>

          {/* Mobile Menu Button (for future mobile implementation) */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
