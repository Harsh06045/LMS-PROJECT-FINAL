import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  } = useContext(AppContext);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse || null);
  }, [id, allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  // Ratings logic
  const ratingsArray = Array.isArray(courseData.courseRatings)
    ? courseData.courseRatings
    : [];
  const validRatings = ratingsArray.filter(
    (r) => typeof r === "number" && !isNaN(r)
  );
  const ratingCount = ratingsArray.length;

  let rating;
  if (validRatings.length > 0) {
    rating =
      validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length;
  } else if (ratingCount > 0) {
    rating = 1.0;
  } else {
    rating = undefined;
  }

  // Enrollment count
  const enrolledCount = Array.isArray(courseData.enrolledStudents)
    ? courseData.enrolledStudents.length
    : typeof courseData.enrolledStudents === "number"
    ? courseData.enrolledStudents
    : 0;

  // Currency conversion from USD to INR (safe handling)
  const USD_TO_INR = 83;
  const originalPrice = Number(courseData.coursePrice) || 0;
  const discount = Number(courseData.discount) || 0;

  const convertedOriginalPrice = originalPrice * USD_TO_INR;
  const convertedDiscountedPrice =
    convertedOriginalPrice - (discount * convertedOriginalPrice) / 100;

  // Safe description
  const courseDescription = (courseData.courseDescription || "").toString();

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
          <h1
            className="
            relative inline-block md:text-course-details-heading-large text-course-details-heading-small font-semibold text-[black] [--tw-text-opacity:1]
            opacity-0 translate-y-3 animate-[fadeUp_500ms_ease-out_100ms_forwards]
            after:content-[''] after:absolute after:inset-0
            after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)]
            after:-translate-x-full after:animate-[shine_900ms_ease-out_300ms_forwards]
          "
          >
            {courseData.courseTitle}
          </h1>
          <p
            className="
            pt-4 md:text-base text-sm text-[black] [--tw-text-opacity:1]
            opacity-0 translate-y-3 animate-[fadeUp_600ms_ease-out_250ms_forwards]
          "
          >
            {courseDescription.replace(/<[^>]*>/g, "").slice(0, 188)}
          </p>

          {/* Ratings and students */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            {rating !== undefined ? (
              <>
                <p className="font-semibold text-yellow-600">
                  {rating.toFixed(1)}
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, idx) => (
                    <img
                      key={idx}
                      src={
                        idx < Math.round(rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt=""
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  ({ratingCount} rating{ratingCount === 1 ? "" : "s"}){" "}
                  {enrolledCount} student{enrolledCount === 1 ? "" : "s"}
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
                  (0 rating) {enrolledCount} student
                  {enrolledCount === 1 ? "" : "s"}
                </p>
              </>
            )}
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">EduLearn Pro</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                        className={`transition-transform duration-300 ${
                          openSections[index] ? "rotate-180" : "rotate-0"
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Toggle content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openSections[index]
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="list-none md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300 bg-gray-50">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 py-2 hover:bg-gray-100 px-2 rounded transition-colors duration-150"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1 flex-shrink-0"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-sm">
                            <p className="flex-1">{lecture.lectureTitle}</p>
                            <div className="flex gap-3 items-center flex-shrink-0 ml-2">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
                                  Preview
                                </p>
                              )}
                              <p className="text-gray-500 font-medium">
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
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

          <div className="py-20 text-sm md:text-base">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Course Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {courseDescription.replace(/<[^>]*>/g, "").trim()}
                </p>
              </div>
            </div>

            {/* What you'll learn section */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                What you'll learn
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <img
                    src={assets.check_icon || assets.star}
                    alt="check"
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600">
                    Master the fundamentals and advanced concepts
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <img
                    src={assets.check_icon || assets.star}
                    alt="check"
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600">
                    Hands-on practical projects and exercises
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <img
                    src={assets.check_icon || assets.star}
                    alt="check"
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600">
                    Industry best practices and real-world applications
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <img
                    src={assets.check_icon || assets.star}
                    alt="check"
                    className="w-4 h-4 mt-1 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600">
                    Certificate of completion upon finishing
                  </p>
                </div>
              </div>
            </div>

            {/* Course requirements */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Requirements
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-gray-600">
                    Basic computer knowledge and internet access
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-gray-600">
                    Willingness to learn and practice regularly
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-gray-600">
                    No prior experience required - beginner friendly
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          <img src={courseData.courseThumbnail} alt="" />
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                ₹
                {convertedDiscountedPrice.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                ₹
                {convertedOriginalPrice.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="md:text-lg text-gray-500">{discount}% off</p>
            </div>
            <div className="flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" className="w-4 h-4" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img
                  src={assets.time_left_clock_icon}
                  alt="clock icon"
                  className="w-4 h-4"
                />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img
                  src={assets.play_icon}
                  alt="lessons icon"
                  className="w-4 h-4"
                />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
