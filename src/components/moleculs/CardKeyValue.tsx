import React, { FC } from "react";

type Props = {
  keyName: string;
  value: string;
};
// Menampilkan key dan value di dalam card
export const CardKeyValue: FC<Props> = ({ keyName, value }) => {
  return (
    <div className="flex flex-row my-3">
      <p className="font-medium md:w-3/12 w-6/12">{keyName}</p>
      <p className="flex flex-1">{value}</p>
    </div>
  );
};
