import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value = 0, max = 5, size = 'sm', interactive = false, onChange }) => {
  // Convert value to nearest 0.5
  const roundedValue = Math.round(value * 2) / 2;
  
  const starSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };
  
  const iconSize = starSizes[size] || starSizes.sm;
  
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (i <= roundedValue) {
      // Full star
      stars.push(
        <FaStar 
          key={`star-${i}`} 
          className="text-warning"
          size={iconSize}
          onClick={() => interactive && onChange && onChange(i)}
          data-testid={`star-${i}`}
        />
      );
    } else if (i - 0.5 === roundedValue) {
      // Half star
      stars.push(
        <FaStarHalfAlt 
          key={`star-${i}`} 
          className="text-warning"
          size={iconSize}
          onClick={() => interactive && onChange && onChange(i - 0.5)}
          data-testid={`star-half-${i}`}
        />
      );
    } else {
      // Empty star
      stars.push(
        <FaRegStar 
          key={`star-${i}`} 
          className={interactive ? "text-warning" : "text-gray-300"}
          size={iconSize}
          onClick={() => interactive && onChange && onChange(i)}
          data-testid={`star-empty-${i}`}
        />
      );
    }
  }
  
  return (
    <div 
      className={`flex ${interactive ? 'cursor-pointer' : ''}`}
      aria-label={`Rating: ${value} out of ${max}`}
      data-testid="rating-value"
    >
      {stars}
      {value > 0 && (
        <span className="ml-1 text-sm text-gray-600" data-testid="rating-text">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;
