import React, { useState } from 'react'
import assets from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='relative'>
      <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
        {/* Left section with logo and brand name */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
            <img src={assets.lightning_icon} alt="Lightning" className='w-6 h-6' />
          </div>
          <span className='text-xl font-bold text-gray-800'>Edemy</span>
        </div>
        
        {/* Desktop navigation */}
        <div className='hidden md:flex items-center gap-5 text-gray-600'>
          <div className='flex items-center gap-4'>
            <button className='hover:text-gray-800 transition-colors'>
              Become Educator
            </button>
            <span className='text-gray-400'>|</span>
            <Link 
              to='/my-enrollments' 
              className='hover:text-gray-800 transition-colors'
            >
              My Enrollments
            </Link>
          </div>
          <button className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors'>
            Create Account
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className='md:hidden p-2'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50'>
          <div className='px-4 py-4 space-y-3'>
            <button className='block w-full text-left text-gray-600 hover:text-gray-800 py-2'>
              Become Educator
            </button>
            <Link 
              to='/my-enrollments' 
              className='block w-full text-left text-gray-600 hover:text-gray-800 py-2'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Enrollments
            </Link>
            <button className='w-full bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors'>
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
