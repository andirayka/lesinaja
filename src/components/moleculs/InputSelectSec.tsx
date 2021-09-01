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
        <div className="relative">
          <select
            className="appearance-none p-2 bg-white border-gray-200 border-2 rounded-md w-full outline-none"
            {...useHookRegister}
          >
            <option value="">{defaultOption}</option>
            {data &&
              Object.entries(data).map(([key, value]: any) => {
                return <option key={key}>{value.nama}</option>;
              })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
