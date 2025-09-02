import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Coursecard from './Coursecard'
import { AppContext } from '../../context/AppContext'

const CourseSection = () => {
  const { allCourses } = useContext(AppContext)

  return (
    <div className="py-16 md:px-40 px-8">
      {/* Header */}
      <div className="mb-8 transition-all duration-300">
        <h2 className="text-3xl font-medium text-gray-800 dark:text-white">
          Learn from the best
        </h2>
        <p className="text-sm md:text-base mt-3 text-gray-500 dark:text-gray-400">
          Discover our top-rated courses across various categories. From coding and design to <br />
          business and welfare, our courses are crafted to deliver results.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses && allCourses.length > 0
          ? allCourses.slice(0, 4).map((course) => (
              // FIX: Use a unique and stable ID for the key, not the index.
              <Coursecard key={course._id} course={course} />
            ))
          : (
            <p className="text-gray-600 dark:text-gray-400">
              No courses available.
            </p>
          )
        }
      </div>

      {/* Show All Courses Button */}
      <Link
        to={'/course-list'}
        onClick={() => window.scrollTo(0, 0)}
        className="px-10 py-3 rounded text-gray-500 border border-gray-500/30 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors duration-300"
      >
        Show all courses
      </Link>
    </div>
  )
}

export default CourseSection