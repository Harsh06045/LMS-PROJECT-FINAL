
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { assets } from '../../../assets/assets'
import { Link } from 'react-router-dom'

// Predefined prices you want to show
const predefinedPrices = [9200, 5500, 7500, 6400, 6500, 5400]

const Coursecard = ({ course }) => {
  const { currency } = useContext(AppContext)
  
  // Sync with Navbar's localStorage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  // Listen for theme changes from Navbar
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme')
      setIsDarkMode(savedTheme === 'dark')
    }

    const interval = setInterval(handleThemeChange, 100)
    return () => clearInterval(interval)
  }, [])

  // Generate a consistent index based on course._id string
  const getPriceIndex = (id) => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash) % predefinedPrices.length
  }

  // Generate random number of ratings between 200 and 300
  const getRandomRatingCount = (id) => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 7) - hash)
    }
    const randomSeed = Math.abs(hash) % 101 // 0-100
    return 200 + randomSeed // 200-300
  }

  const price = predefinedPrices[getPriceIndex(course._id)]
  const rating = 4.2 // Fixed rating of 4.2
  const ratingCount = getRandomRatingCount(course._id)

  return (
    <Link 
      to={'/course/' + course._id} 
      onClick={() => scrollTo(0, 0)} 
      className={`border pb-6 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg ${
        isDarkMode 
          ? 'border-gray-600 bg-gray-800 hover:bg-gray-750' 
          : 'border-gray-300 bg-white hover:bg-gray-50'
      }`}
    >
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className={`text-base font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {course.courseTitle}
        </h3>
        <p className={`transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {course.educator.name}
        </p>
        <div className='flex items-center space-x-2'>
          <p className='font-semibold text-yellow-600'>{rating.toFixed(1)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=''
                className='w-3.5 h-3.5' 
              />
            ))}
          </div>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            ({ratingCount})
          </p>
        </div>
        <p className={`text-base font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {currency}
          {price}
        </p>
      </div>
    </Link>
  )
}

export default Coursecard
