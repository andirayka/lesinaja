import React, { FC } from "react";

type Props = {
  data: any;
  label?: string;
  defaultOption: string;
  useHookRegister?: any;
};

export const InputSelectSec: FC<Props> = ({
  data,
  label,
  useHookRegister,
  defaultOption,
}) => {
  return (
    <>
      <div className="mt-4">
        <p>{label}</p>
        <select
          className="p-1 bg-white border-gray-300 border-2 rounded-md w-full outline-none"
          {...useHookRegister}
        >
          <option value="">{defaultOption}</option>
          {data &&
            Object.entries(data).map(([key, value]: any) => {
              return <option key={key}>{value.nama}</option>;
            })}
        </select>
      </div>
    </>
  );
};
