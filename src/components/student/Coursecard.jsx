import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

// Predefined prices you want to show
const predefinedPrices = [9200, 5500, 7500, 6400, 6500, 5400];

const Coursecard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  // Generate a consistent index based on course._id string
  const getPriceIndex = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % predefinedPrices.length;
  };

  const price = predefinedPrices[getPriceIndex(course._id)];

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
