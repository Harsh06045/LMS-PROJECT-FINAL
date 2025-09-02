import React, { useState, useEffect } from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // This logic is fine, but for larger apps, consider a custom hook or context for dark mode.
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    handleThemeChange()
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`pb-14 px-8 md:px-0 w-full md:px-40 transition-colors duration-300`}>
      {/* Header Section */}
      <h2 className={`text-3xl font-medium text-gray-800 dark:text-white`}>
        Testimonials
      </h2>
      <p className={`md:text-base mt-3 text-gray-500 dark:text-gray-400`}>
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their lives.
      </p>

      {/* Testimonials Grid */}
      {/* FIX: Replaced invalid 'grid-cols-auto' with a responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className={`text-sm text-left border pb-6 rounded-lg overflow-hidden transition-all duration-300
              ${isDarkMode
                ? 'border-gray-700 bg-gray-800 shadow-lg hover:shadow-gray-700/50'
                : 'border-gray-200 bg-white shadow-lg hover:shadow-xl'
              }`}
          >
            {/* User Info Header */}
            <div className={`flex items-center gap-4 px-5 py-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-white/20"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {testimonial.name}
                </h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Rating and Feedback */}
            <div className="p-5 pb-7">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
                <span className={`ml-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  ({testimonial.rating})
                </span>
              </div>

              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {testimonial.feedback}
              </p>
            </div>

            {/* FIX: Prevent page jump on click */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`px-5 text-sm font-medium transition-colors duration-300 hover:underline ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'
              }`}
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection