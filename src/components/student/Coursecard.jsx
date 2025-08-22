import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

// Predefined prices you want to show
const predefinedPrices = [9200, 5500, 7500, 6400, 6500, 5400];

const Coursecard = ({ course }) => {
  const { currency } = useContext(AppContext);

  // Generate a consistent index based on course._id string
  const getPriceIndex = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % predefinedPrices.length;
  };

  // Generate random number of ratings between 200 and 300
  const getRandomRatingCount = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 7) - hash);
    }
    const randomSeed = Math.abs(hash) % 101; // 0-100
    return 200 + randomSeed; // 200-300
  };

  const price = predefinedPrices[getPriceIndex(course._id)];
  const rating = 4.2; // Fixed rating of 4.2
  const ratingCount = getRandomRatingCount(course._id);

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={course.courseThumbnail} alt="" />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p className='font-semibold text-yellow-600'>{rating.toFixed(1)}</p>
          <div className='flex'>
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.floor(rating) ? assets.star : assets.star_blank}
                alt=''
                className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>({ratingCount})</p>
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
