import React, { FC } from "react";
import { SkeletonLoading, CardItem, EmptyIcon } from "@components";

type Props = {
  type: "loading" | "noData";
  title?: string;
};
// Card yang menampilkan list data di dalam content
export const CardEmpty: FC<Props> = ({ type, title }) => {
  if (type == "loading")
    return (
      <CardItem title="Loading..." containerClass="mt-8">
        <SkeletonLoading fullWidthLineCount={5} />
      </CardItem>
    );

  // Default = noData
  return (
    <CardItem title={title} containerClass="mt-8">
      <EmptyIcon />
    </CardItem>
  );
};
