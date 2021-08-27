import { InputText, Button, InputSelect } from "@components";
import { getFirebaseDataOnce } from "@utils";
import { type } from "node:os";
import React, { FC, useState, useEffect } from "react";

type Props = {
  value: any;
  onChange: (e: any) => any;
  onClick: (e: any) => any;
  filterData: (o: any) => any;
  clearFilterInput: object;
};

export const CardUserFilter: FC<Props> = ({
  value,
  onChange,
  onClick,
  filterData,
  clearFilterInput,
}) => {
  const [dropdownData, setDropdownData] = useState<object>({});

  const [prompt, setPrompt] = useState<object>({});

  const getDropdownData = async () => {
    const dropdownDataQuery = {
      provinsi: await getFirebaseDataOnce("wilayah_provinsi"),
      kabupaten: await getFirebaseDataOnce(
        `wilayah_kabupaten/${prompt.provinsiKey}`
      ),
      kecamatan: await getFirebaseDataOnce(
        `wilayah_kecamatan/${prompt.provinsiKey}/${prompt.kabupatenKey}`
      ),
      desa: await getFirebaseDataOnce(
        `wilayah_desa/${prompt.provinsiKey}/${prompt.kabupatenKey}/${prompt.kecamatanKey}`
      ),
    };

    setDropdownData({
      ...dropdownData,
      provinsi: dropdownDataQuery.provinsi,
      kabupaten: dropdownDataQuery.kabupaten,
      kecamatan: dropdownDataQuery.kecamatan,
      desa: dropdownDataQuery.desa,
    });
  };

  const conditionalPromptRender = (type: string) => {
    if (prompt[type]) {
      if (type == "provinsi") {
        return <p>{prompt.provinsi}</p>;
      } else if (type == "kabupaten") {
        return <p>{prompt.kabupaten}</p>;
      } else if (type == "kecamatan") {
        return <p>{prompt.kecamatan}</p>;
      } else if (type == "desa") {
        return <p>{prompt.desa}</p>;
      }
    } else {
      return <p>{`pilih ${type}`}</p>;
    }
  };

  const conditionalDropdownRender = (type: string) => {
    return (
      <InputSelect
        data={dropdownData[type] && dropdownData[type]}
        heading={`Filter berdasarkan wilayah ${type}`}
        prompt={conditionalPromptRender(type)}
        containerClassName="cursor-pointer p-2"
        itemClassName="w-full"
        onChange={({ value, key }) => {
          if (type == "provinsi") {
            setPrompt({
              provinsi: value.nama,
              provinsiKey: key,
            });
          } else if (type == "kabupaten") {
            setPrompt({
              ...prompt,
              kabupaten: value.nama,
              kabupatenKey: key,
              kecamatan: undefined,
              kecamatanKey: undefined,
              desa: undefined,
              desaKey: undefined,
            });
          } else if (type == "kecamatan") {
            setPrompt({
              ...prompt,
              kecamatan: value.nama,
              kecamatanKey: key,
              desa: undefined,
              desaKey: undefined,
            });
          } else if (type == "desa") {
            setPrompt({
              ...prompt,
              desa: value.nama,
              desaKey: key,
            });
          }
        }}
      />
    );
  };

  const getPromptData = () => {};

  useEffect(() => {
    getDropdownData();
  }, [prompt]);

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
      <div className="flex flex-col">
        {dropdownData.provinsi && conditionalDropdownRender("provinsi")}
        {prompt.provinsi && conditionalDropdownRender("kabupaten")}
        {prompt.kabupaten && conditionalDropdownRender("kecamatan")}
        {prompt.kecamatan && conditionalDropdownRender("desa")}
      </div>
      <div className="flex flex-row">
        <Button
          text="Filter"
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg my-4 mx-2 w-1/2"
          onClick={() => {
            filterData(prompt.provinsiKey);
          }}
        />
        <Button
          text="Reset"
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg my-4 mr-2 w-1/2"
          onClick={() => {
            setPrompt(clearFilterInput);
            filterData(undefined);
          }}
        />
      </div>
    </div>
  );
};

export default CardUserFilter;
