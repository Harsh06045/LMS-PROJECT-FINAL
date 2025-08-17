import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'

const Educator = () => {
  return (
    <div className='min-h-screen'>
      {/* Educator specific navbar */}
      <Navbar />

      {/* Route content */}
      <div className='mt-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default Educator