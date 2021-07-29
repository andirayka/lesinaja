import React from "react";

const Skeleton = ({
  mainCount,
  subCount,
  containerClassName = "space-y-3",
  elementClassName = "h-3",
}) => {
  return (
    <div className="animate-pulse">
      <div className={containerClassName}>
        {mainCount &&
          mainCount.map((index) => {
            return (
              <div
                key={index}
                className={`${elementClassName} bg-gray-200 rounded`}
              />
            );
          })}
        {subCount &&
          subCount.map((index) => {
            return (
              <div
                key={index}
                className={`${elementClassName} w-1/2 bg-gray-200 rounded`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Skeleton;
