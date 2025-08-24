import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})

  const { 
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime
  } = useContext(AppContext)

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse || null)
  }, [id, allCourses])

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!courseData) return <Loading />

  // Ratings logic (left unchanged)
  const ratingsArray = Array.isArray(courseData.courseRatings) ? courseData.courseRatings : [];
  const validRatings = ratingsArray.filter(r => typeof r === 'number' && !isNaN(r));
  const ratingCount = ratingsArray.length;

  let rating;
  if (validRatings.length > 0) {
    rating = validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length;
  } else if (ratingCount > 0) {
    rating = 1.0;
  } else {
    rating = undefined;
  }

  // Enrollment count (unchanged)
  const enrolledCount = Array.isArray(courseData.enrolledStudents)
    ? courseData.enrolledStudents.length
    : typeof courseData.enrolledStudents === 'number'
      ? courseData.enrolledStudents
      : 0;

  return (
    <>
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shine {
            0% { transform: translateX(-120%); opacity: 0; }
            25% { opacity: 1; }
            100% { transform: translateX(120%); opacity: 0; }
          }
        `}
      </style>
      <div className="flex flex-col md:flex-row gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left bg-white text-black min-h-screen">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>
        <div className="max-w-xl x-10">
          <h1 className="
            relative inline-block md:text-course-details-heading-large text-course-details-heading-small font-semibold text-[black] [--tw-text-opacity:1]
            opacity-0 translate-y-3 animate-[fadeUp_500ms_ease-out_100ms_forwards]
            after:content-[''] after:absolute after:inset-0
            after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)]
            after:-translate-x-full after:animate-[shine_900ms_ease-out_300ms_forwards]
          ">
            {courseData.courseTitle}
          </h1>
          <p className="
            pt-4 md:text-base text-sm text-[black] [--tw-text-opacity:1]
            opacity-0 translate-y-3 animate-[fadeUp_600ms_ease-out_250ms_forwards]
          ">
            {courseData.courseDescription.replace(/<[^>]*>/g, '').slice(0, 188)}
          </p>

          {/* Ratings and students */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            {rating !== undefined ? (
              <>
                <p className="font-semibold text-yellow-600">{rating.toFixed(1)}</p>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <img
                      key={idx}
                      src={idx < Math.round(rating) ? assets.star : assets.star_blank}
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  ({ratingCount} rating{ratingCount === 1 ? '' : 's'}) {enrolledCount} student{enrolledCount === 1 ? '' : 's'}
                </p>
              </>
            ) : (
              <>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <img
                      key={idx}
                      src={assets.star_blank}
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  (0 rating) {enrolledCount} student{enrolledCount === 1 ? '' : 's'}
                </p>
              </>
            )}
          </div>

          <p className="text-sm">Course by <span className="text-blue-600 underline">EduLearn Pro</span></p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img src={assets.down_arrow_icon} alt="arrow icon" />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                  </div>

                  {/* Toggle content */}
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && <p className="text-blue-500 cursor-pointer">Preview</p>}
                              <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDetails;
