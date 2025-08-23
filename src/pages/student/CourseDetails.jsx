import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses } = useContext(AppContext)

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse || null)
  }, [id, allCourses])

  if (!courseData) return <Loading />

  return (
    <>
      {/* Local keyframes (you can move these to a global CSS if preferred) */}
      <style>
        {`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0%   { transform: translateX(-120%); opacity: 0; }
          25%  { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        `}
      </style>

      <div className="flex flex-col md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left bg-white text-black min-h-screen">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        <div className="max-w-xl x-10">
          {/* Title: darker text + subtle shine + fade/slide-in */}
          <h1
            className="
              relative inline-block
              md:text-course-details-heading-large
              text-course-details-heading-small
              font-semibold text-[black] [--tw-text-opacity:1]
              opacity-0 translate-y-3
              animate-[fadeUp_500ms_ease-out_100ms_forwards]
              after:content-[''] after:absolute after:inset-0
              after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)]
              after:-translate-x-full after:animate-[shine_900ms_ease-out_300ms_forwards]
            "
          >
            {courseData.courseTitle}
          </h1>

          {/* Paragraph: darker text + delayed fade/slide-in */}
          <p
            className="
              pt-4 md:text-base text-sm text-[black] [--tw-text-opacity:1]
              opacity-0 translate-y-3
              animate-[fadeUp_600ms_ease-out_250ms_forwards]
            "
          >
            {courseData.courseDescription.replace(/<[^>]*>/g, '').slice(0, 188)}
          </p>
        </div>

        <div></div>
      </div>
    </>
  )
}

export default CourseDetails
