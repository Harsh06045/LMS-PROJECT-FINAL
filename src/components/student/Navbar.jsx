import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets' // Update path if needed
import { useClerk, UserButton,useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')

  const{openSignIn} = useClerk()
  const {user} = useUser()


  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'
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
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <button className="hover:text-gray-700 transition-colors">
            Become Educator
          </button>
          <Link
            to="/my-enrollments"
            className="hover:text-gray-700 transition-colors"
          >
            My Enrollments
          </Link>
        </div>
        { user ? <UserButton/> :
        <button
          onClick={() => openSignIn()}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Create Account
            </button>}
            </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex flex-col gap-1">
          <button className="hover:text-gray-700 transition-colors">
            Become Educator
          </button>
          <Link
            to="/my-enrollments"
            className="hover:text-gray-700 transition-colors"
          >
            My Enrollments
          </Link>
        </div>
        <button>
          <img
            src={assets.user_icon}
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </div>
  )
}

export default Navbar
