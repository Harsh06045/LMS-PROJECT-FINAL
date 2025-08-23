import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import Coursecard from '../../components/student/Coursecard'
<<<<<<< Updated upstream
import Footer from '../../components/student/Footer'
=======
import { assets } from '../../assets/assets' 
>>>>>>> Stashed changes

const CoursesList = () => {
  const {navigate, allCourses} = useContext(AppContext)
  const {input} = useParams()
  
  // Dark mode sync logic
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme')
      setIsDarkMode(savedTheme === 'dark')
    }

    const interval = setInterval(handleThemeChange, 100)
    return () => clearInterval(interval)
  }, [])
  
  // Enhanced filtering logic
  const displayCourses = input && input.trim() !== '' 
    ? allCourses?.filter(course => {
        const searchText = input.toLowerCase().trim()
        
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
          Object.values(course).some(value => 
            typeof value === 'string' && 
            value.toLowerCase().includes(searchText)
          )
        )
      }) || []
    : allCourses || []

  return (
    <>
      {/* Main Content Container - Fixed height to push footer down */}
      <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        
        {/* Page Content */}
        <div className={`flex-grow relative md:px-36 px-8 pt-20 text-left transition-colors duration-300`}>
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

        {/* Footer - Will stick to bottom */}
        <footer className={`mt-auto border-t transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-gray-300' 
            : 'bg-gray-50 border-gray-200 text-gray-600'
        }`}>
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
            <div className="text-center">
              <p>&copy; 2025 EduLearn Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>
      <Footer/>
    </>
    
  )
}

export default CoursesList
