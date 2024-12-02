import React from "react";
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;

        // Logic to determine which icon to render
        if (rating >= starValue) {
          return (
            <BiSolidStar key={index} size={24} className="text-orange-400" />
          );
        } else if (rating > starValue - 1 && rating < starValue) {
          return (
            <BiSolidStarHalf
              key={index}
              size={24}
              className="text-orange-400"
            />
          );
        } else {
          return (
            <BiSolidStar key={index} size={24} className="text-gray-300" />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
