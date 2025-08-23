import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Coursecard from './Coursecard';
import { AppContext } from '../../context/AppContext';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode on component mount and listen for changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    handleThemeChange();

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className='py-16 md:px-40 px-8'>
      {/* Header with very light white background ONLY in dark mode */}
      <div className={`${isDarkMode ? 'bg-white/5 p-6 rounded-lg' : ''} mb-8 transition-all duration-300`}>
        <h2 className={`text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Learn from the best
        </h2>
        <p className={`text-sm md:text-base mt-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          Discover our top-rated courses across various categories. From coding and design to <br />
          business and welfare, our courses are crafted to deliver results.
        </p>
      </div>
       
      {/* Courses Grid */}
      <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses && allCourses.length > 0
          ? allCourses.slice(0, 4).map((course, index) => (
              <Coursecard key={index} course={course} />  
            ))
          : <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No courses available.
            </p>
        }
      </div>

      {/* Show All Courses Button */}
      <Link
        to={'/course-list'}
        onClick={() => window.scrollTo(0, 0)}
        className={`px-10 py-3 rounded transition-colors duration-300 ${
          isDarkMode 
            ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' 
            : 'text-gray-500 border border-gray-500/30 hover:bg-gray-100'
        }`}
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CourseSection;
