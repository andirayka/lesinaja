import React, { FC } from "react";

type Props = {
  fullWidthLineCount: number;
  halfWidthLineCount?: number;
  containerClassName?: string;
  elementClassName?: string;
};
// Tampilan skeleton loading
export const SkeletonLoading: FC<Props> = ({
  fullWidthLineCount,
  halfWidthLineCount,
  containerClassName = "space-y-3",
  elementClassName = "h-3",
}) => {
  return (
    <div className="animate-pulse">
      <div className={containerClassName}>
        {[...Array(fullWidthLineCount)].map((item, index) => {
          return (
            <div
              key={index}
              className={`${elementClassName} bg-gray-200 rounded`}
            />
          );
        })}

        {halfWidthLineCount &&
          [...Array(halfWidthLineCount)].map((item, index) => {
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
