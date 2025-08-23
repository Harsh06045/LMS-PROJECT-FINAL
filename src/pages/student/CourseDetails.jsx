import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses } = useContext(AppContext)

  const fetchCourseData = () => {
    if (!allCourses || allCourses.length === 0) return
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [id, allCourses])

  return courseData ? (
    <div className="flex flex-col md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left transition-colors duration-300
      bg-white dark:bg-[#181e29] text-gray-900 dark:text-gray-100 min-h-screen">
      
      <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70 dark:from-cyan-600/50"></div>

      <div className="max-w-xl x-10">
        <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800 dark:text-white">
          {courseData.courseTitle}
        </h1>
        <p className="pt-4 md:text-base text-sm text-gray-700 dark:text-gray-300">
          {courseData.courseDescription
            .replace(/<[^>]*>/g, '')  // remove HTML tags
            .slice(0, 188)}
        </p>
      </div>

      <div></div>
    </div>
  ) : <Loading />
}

export default CourseDetails
