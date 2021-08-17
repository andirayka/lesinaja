import React, { FC } from "react";

type Props = {
  image: string;
  useHookRegister?: any;
  disabled?: boolean;
  onChange?: any;
  isFile?: boolean;
};

export const InputFile: FC<Props> = ({
  image,
  useHookRegister,
  disabled,
  onChange,
  isFile,
}) => {
  return (
    <div className="mt-4 flex flex-col md:flex-row md:items-end">
      <div className="md:w-1/4 flex-none">
        <img src={image} alt="" {...useHookRegister} />
      </div>
      <div className="flex-grow">
        {isFile && (
          <input
            onChange={onChange}
            disabled={disabled}
            type="file"
            className="border-2 rounded-lg outline-none border-gray-200 px-1 py-1.5 focus:border-gray-600"
          />
        )}
      </div>
    </div>
  );
};
