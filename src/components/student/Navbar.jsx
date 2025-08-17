import React from 'react'
import assets from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 ${isCourseListPage ? 'bg-white' : 'bg-blue-100'}`}>
      <div className='flex items-center'>
        <img src={assets.logo} alt="Edemy Logo" className='h-8 w-auto cursor-pointer' />
      </div>
      
      <div className='hidden md:flex items-center gap-5 text-gray-700'>
        <div className='flex items-center gap-4'>
          <button className='hover:text-gray-900 transition-colors'>
            Become Educator
          </button>
          <span className='text-gray-400'>|</span>
          <Link 
            to='/my-enrollments' 
            className='hover:text-gray-900 transition-colors'
          >
            My Enrollments
          </Link>
        </div>
        <button className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors'>
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Navbar
