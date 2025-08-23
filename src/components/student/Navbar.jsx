import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import Coursecard from '../../components/student/Coursecard'
import { assets } from '../../assets/assets' 

const CoursesList = () => {
  const {navigate, allCourses} = useContext(AppContext)
  const {input} = useParams()
  
  // Sync with Navbar's localStorage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount (same as your Navbar)
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

    // Poll for changes every 100ms to stay in sync with Navbar
    const interval = setInterval(handleThemeChange, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Enhanced filtering logic with more comprehensive search
  const displayCourses = input && input.trim() !== '' 
    ? allCourses?.filter(course => {
        const searchText = input.toLowerCase().trim()
        
        // Check all possible course properties
        return (
          course.title?.toLowerCase().includes(searchText) ||
          course.name?.toLowerCase().includes(searchText) ||
          course.courseName?.toLowerCase().includes(searchText) ||
          course.course_name?.toLowerCase().includes(searchText) ||
          course.description?.toLowerCase().includes(searchText) ||
          course.category?.toLowerCase().includes(searchText) ||
          course.subject?.toLowerCase().includes(searchText) ||
          course.instructor?.toLowerCase().includes(searchText) ||
          course.teacher?.toLowerCase().includes(searchText) ||
          // Check if any string value in the course object contains the search term
          Object.values(course).some(value => 
            typeof value === 'string' && 
            value.toLowerCase().includes(searchText)
          )
        )
      }) || []
    : allCourses || []

  return (
    <>
      <div className={`relative md:px-36 px-8 pt-20 text-left min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className={`text-4xl font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Course List
            </h1>
            <p className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span className={`cursor-pointer transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`} onClick={()=> navigate('/')}>
                Home
              </span> / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        
        {input && (
          <div className={`inline-flex items-center gap-4 px-4 py-2 border rounded-lg mt-4 transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-800 text-gray-300' 
              : 'border-gray-300 bg-gray-50 text-gray-600'
          }`}>
            <p>{input}</p>
            <img 
              src={assets.cross_icon} 
              alt="" 
              className={`cursor-pointer w-4 h-4 transition-opacity duration-200 hover:opacity-70 ${
                isDarkMode ? 'filter invert' : ''
              }`}
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
          {displayCourses && displayCourses.length > 0
          ? displayCourses.map((course, index) => (
            <Coursecard key={index} course={course} />  
          ))
          : <p className={`mt-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {input ? `No courses found for "${input}"` : 'No courses available.'}
            </p>
        }
        </div>
      </div>
    </>
  )
}

export default CoursesList
