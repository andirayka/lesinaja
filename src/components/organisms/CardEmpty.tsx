import React, { FC } from "react";
import { Title } from "@components";
import { SkeletonLoading, CardItem, EmptyIcon } from "@components";

type Props = {
  type: "loading" | "noData";
};
// Card yang menampilkan list data di dalam content
export const CardEmpty: FC<Props> = ({ type }) => {
  if (type == "loading")
    return (
      <CardItem title="Loading..." containerClass="mt-8">
        <SkeletonLoading fullWidthLineCount={5} />
      </CardItem>
    );

  // Default = noData
  return (
    <CardItem title="Belum ada data pembayaran" containerClass="mt-8">
      <EmptyIcon />
    </CardItem>
  );
};
