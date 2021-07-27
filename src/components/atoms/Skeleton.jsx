import React from "react";

const Skeleton = ({ mainCount, subCount }) => {
  return (
    <div className="animate-pulse">
      <div className="space-y-3">
        {mainCount.map((index) => {
          return <div key={index} className="h-3 bg-gray-200 rounded" />;
        })}
        {subCount &&
          subCount.map((index) => {
            return (
              <div key={index} className="h-3 w-1/2 bg-gray-200 rounded " />
            );
          })}
      </div>
    </div>
  );
};

export default Skeleton;
