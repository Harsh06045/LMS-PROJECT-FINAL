import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import humanizeDuration from 'humanize-duration';

import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';
import { assets } from '../../assets/assets';

/* -------------------------------------------------------------------------- */
/*                               Helper utilities                             */
/* -------------------------------------------------------------------------- */
const USD_TO_INR = 83;

const getYoutubeId = (url = '') => {
  // Handles https://youtu.be/XXXXXXXXXXX and https://www.youtube.com/watch?v=XXXXXXXXXXX
  const re =
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|v\/|embed\/))([0-9A-Za-z_-]{11})/;
  const m = url.match(re);
  return m ? m[1] : '';
};

/* -------------------------------------------------------------------------- */
/*                               CourseDetails                                */
/* -------------------------------------------------------------------------- */
const CourseDetails = () => {
  const { id } = useParams();
  const {
    allCourses = [],
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false); // TODO: hook this to auth

  /* ------------------------- look-up course by id ------------------------- */
  useEffect(() => {
    if (!allCourses.length) return;

    const found = allCourses.find((c) => String(c._id) === String(id));
    setCourseData(found || null);

    /* reset UI state when course changes */
    setOpenSections({});
    setPlayerData(null);
  }, [allCourses, id]);

  /* -------------------------- derived / memoized -------------------------- */
  const {
    rating,
    ratingCount,
    enrolledCount,
    courseDescription,
    convertedOriginalPrice,
    convertedDiscountedPrice,
    discount,
  } = useMemo(() => {
    if (!courseData) return {};

    /* ratings ------------------------------------------------------------- */
    const rArr = Array.isArray(courseData.courseRatings)
      ? courseData.courseRatings
      : [];
    const valid = rArr.filter((r) => typeof r === 'number' && !isNaN(r));
    const ratingCnt = rArr.length;
    const ratingAvg =
      valid.length > 0
        ? valid.reduce((s, n) => s + n, 0) / valid.length
        : ratingCnt > 0
        ? 1
        : undefined;

    /* students ------------------------------------------------------------- */
    const enrolled = Array.isArray(courseData.enrolledStudents)
      ? courseData.enrolledStudents.length
      : Number(courseData.enrolledStudents) || 0;

    /* price ---------------------------------------------------------------- */
    const priceUSD = Number(courseData.coursePrice) || 0;
    const disc = Number(courseData.discount) || 0;
    const origINR = priceUSD * USD_TO_INR;
    const finalINR = origINR - (disc / 100) * origINR;

    return {
      rating: ratingAvg,
      ratingCount: ratingCnt,
      enrolledCount: enrolled,
      courseDescription: String(courseData.courseDescription || ''),
      convertedOriginalPrice: origINR,
      convertedDiscountedPrice: finalINR,
      discount: disc,
    };
  }, [courseData]);

  const toggleSection = (i) =>
    setOpenSections((s) => ({ ...s, [i]: !s[i] }));

  if (!courseData) return <Loading />;

  /* -------------------------------------------------------------------------- */
  /*                                   markup                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <style>
        {`
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
          @keyframes shine{0%{transform:translateX(-120%);opacity:0}25%{opacity:1}100%{transform:translateX(120%);opacity:0}}
        `}
      </style>

      <div className="relative flex min-h-screen flex-col gap-10 bg-white px-8 pt-20 text-black md:flex-row md:px-36 md:pt-30">
        {/* background tint */}
        <div className="absolute inset-0 -z-10 h-[340px] bg-gradient-to-b from-cyan-100/70" />

        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN                                                        */}
        {/* ------------------------------------------------------------------ */}
        <div className="max-w-xl">
          {/* heading */}
          <h1 className="relative inline-block text-xl font-semibold text-black opacity-0 translate-y-3 animate-[fadeUp_500ms_ease-out_100ms_forwards] md:text-4xl after:absolute after:inset-0 after:-translate-x-full after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)] after:content-[''] after:animate-[shine_900ms_ease-out_300ms_forwards]">
            {courseData.courseTitle}
          </h1>

          {/* short description */}
          <p className="pt-4 text-sm text-black opacity-0 translate-y-3 animate-[fadeUp_600ms_ease-out_250ms_forwards] md:text-base">
            {courseDescription.replace(/<[^>]*>/g, '').slice(0, 188)}
          </p>

          {/* rating + students */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            {rating !== undefined ? (
              <>
                <p className="font-semibold text-yellow-600">
                  {rating.toFixed(1)}
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < Math.round(rating) ? assets.star : assets.star_blank}
                      alt="star"
                      className="h-3.5 w-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500">
                  ({ratingCount} rating{ratingCount === 1 ? '' : 's'}){' '}
                  {enrolledCount} student{enrolledCount === 1 ? '' : 's'}
                </p>
              </>
            ) : (
              <>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={assets.star_blank}
                      alt="star blank"
                      className="h-3.5 w-3.5"
                    />
                  ))}
                </div>
                <p className="text-gray-500">
                  (0 rating) {enrolledCount} student
                  {enrolledCount === 1 ? '' : 's'}
                </p>
              </>
            )}
          </div>

          <p className="text-sm">
            Course by <span className="underline text-blue-600">EduLearn Pro</span>
          </p>

          {/* ------------------------ COURSE STRUCTURE ----------------------- */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent?.map((chapter, idx) => (
                <div key={idx} className="mb-2 rounded border border-gray-300 bg-white">
                  {/* chapter header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(idx)}
                    className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="arrow"
                        className={`h-4 w-4 transition-transform ${
                          openSections[idx] ? 'rotate-180' : ''
                        }`}
                      />
                      <p className="text-sm font-medium md:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {chapter.chapterContent?.length || 0} lectures •{' '}
                      {calculateChapterTime(chapter)}
                    </p>
                  </button>

                  {/* lecture list */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[idx] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="border-t border-gray-300 bg-gray-50 py-2 pr-4 md:pl-10 list-none pl-4 text-gray-600">
                      {chapter.chapterContent?.map((lecture, li) => (
                        <li
                          key={li}
                          className="flex items-start gap-2 rounded px-2 py-2 hover:bg-gray-100"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play"
                            className="h-4 w-4 flex-shrink-0 mt-1"
                          />
                          <div className="flex w-full items-center justify-between text-xs text-gray-800 md:text-sm">
                            <p className="flex-1">{lecture.lectureTitle}</p>
                            <div className="ml-2 flex flex-shrink-0 items-center gap-3">
                              {lecture.isPreviewFree && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPlayerData({ videoId: getYoutubeId(lecture.lectureUrl) })
                                  }
                                  className="text-blue-500 transition-colors hover:text-blue-600"
                                >
                                  Preview
                                </button>
                              )}
                              <p className="font-medium text-gray-500">
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ['h', 'm'] }
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

          {/* --------------------- DESCRIPTION / LEARN / REQ -------------------- */}
          <div className="py-20 text-sm md:text-base">
            {/* description */}
            <h3 className="mb-6 text-xl font-semibold text-gray-900">
              Course Description
            </h3>
            <div className="rounded-lg border-l-4 border-blue-500 bg-gray-50 p-6">
              <p className="whitespace-pre-line leading-relaxed text-gray-700">
                {courseDescription.replace(/<[^>]*>/g, '').trim()}
              </p>
            </div>

            {/* learn */}
            <div className="mt-8">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                What you'll learn
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  'Master the fundamentals and advanced concepts',
                  'Hands-on practical projects and exercises',
                  'Industry best practices and real-world applications',
                  'Certificate of completion upon finishing',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <img
                      src={assets.check_icon}
                      alt="check"
                      className="h-4 w-4 flex-shrink-0 mt-1"
                    />
                    <p className="text-sm text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* requirements */}
            <div className="mt-8">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                Requirements
              </h4>
              <ul className="space-y-2">
                {[
                  'Basic computer knowledge and internet access',
                  'Willingness to learn and practice regularly',
                  'No prior experience required - beginner friendly',
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{req}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT COLUMN (course card)                                         */}
        {/* ------------------------------------------------------------------ */}
        <div className="z-10 min-w-[300px] overflow-hidden rounded-t bg-white shadow-custom-card sm:min-w-[420px]">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="aspect-video w-full"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="course thumbnail"
              className="w-full"
            />
          )}

          <div className="p-5">
            {/* price timer */}
            <div className="flex items-center gap-2">
              <img
                src={assets.time_left_clock_icon}
                alt="time left"
                className="w-3.5"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            {/* price */}
            <div className="flex items-center gap-3 pt-2 md:pt-4">
              <p className="text-2xl font-semibold text-gray-800 md:text-4xl">
                ₹
                {convertedDiscountedPrice?.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="line-through text-gray-500 md:text-lg">
                ₹
                {convertedOriginalPrice?.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-gray-500 md:text-lg">{discount}% off</p>
            </div>

            {/* meta */}
            <div className="flex items-center gap-4 pt-2 text-sm text-gray-500 md:text-base">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" className="h-4 w-4" />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40" />
              <div className="flex items-center gap-1">
                <img
                  src={assets.time_left_clock_icon}
                  alt="clock"
                  className="h-4 w-4"
                />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40" />
              <div className="flex items-center gap-1">
                <img src={assets.play_icon} alt="lessons" className="h-4 w-4" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            {/* enroll button */}
            <button
              disabled={isAlreadyEnrolled}
              className={`mt-4 w-full rounded py-3 font-medium text-white md:mt-6 ${
                isAlreadyEnrolled
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>

            {/* what's inside */}
            <div className="pt-6">
              <p className="text-lg font-medium text-gray-800 md:text-xl">
                What's in the course?
              </p>
              <ul className="list-disc pl-5 pt-2 text-sm text-gray-500 md:text-base">
                <li>Life-time access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;
