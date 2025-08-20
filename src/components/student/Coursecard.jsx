import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Coursecard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  // Generate random price between 5000 and 10000, rounded to nearest 100
  const rawPrice = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  const price = Math.round(rawPrice / 100) * 100;

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{calculateRating(course).toFixed(0)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt=''
                className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold text-gray-800'>
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default Coursecard;
