import { FaStar } from "react-icons/fa";
import React, { useState } from "react";

const Rating = () => {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClik = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex justify-center">
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={50}
            className="mr-5 cursor-pointer"
            color={(hoverValue || currentValue) > index ? "#F59E0B" : "white"}
            onClick={() => handleClik(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Rating;
