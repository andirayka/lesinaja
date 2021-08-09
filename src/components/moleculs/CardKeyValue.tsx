import React, { FC } from "react";

type Props = {
  keyName: string;
  value: string;
};
// Menampilkan key dan value di dalam card
export const CardKeyValue: FC<Props> = ({ keyName, value }) => {
  return (
    <div className="flex flex-row my-3">
      <p className="font-medium w-56">{keyName}</p>
      <p className="flex flex-1">{value}</p>
    </div>
  );
};
