import { InputText, Button, InputSelect } from "@components";
import React, { FC } from "react";

type Props = {
  value: any;
  onChange: (e: any) => any;
  onClick: (e: any) => any;
};

export const CardUserFilter: FC<Props> = ({ value, onChange, onClick }) => {
  return (
    <div className="bg-white mt-8 rounded-md shadow-lg">
      <div className="flex flex-row items-center">
        <InputText
          value={value}
          placeholder="Cari data berdasarkan nama..."
          containerClassName="p-2 flex-1"
          onChange={onChange}
        />
        <Button
          text="Cari"
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg mr-2 py-[0.5em]"
          onClick={onClick}
        />
      </div>
      <InputSelect
        data={""}
        heading="Filter berdasarkan wilayah"
        prompt="Pilih provinsi.."
        containerClassName="cursor-pointer p-2"
        itemClassName="w-full"
      />
    </div>
  );
};

export default CardUserFilter;
