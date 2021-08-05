import {
  ContentContainer,
  SectionTitle,
  InputSelect,
  InputText,
  Skeleton,
  Button,
} from "@components";
import React, { useContext, useEffect } from "react";
import { ContextMaster } from "@context";

const AddListCourse = () => {
  const {
    state: { multipleDropdownData },
    getMultipleDropdownData,
  } = useContext(ContextMaster);

  useEffect(() => {
    getMultipleDropdownData();
  }, []);

  const conditionalPromptRender = () => {
    return <div>Pilih</div>;
  };

  const ConditionalDropdownRender = (type, heading) => {
    if (multipleDropdownData[type] === undefined) {
      return <Skeleton mainCount={[1, 2]} elementClassName="w-4/5 h-3 mt-4" />;
    } else if (multipleDropdownData[type] === null) {
      return (
        <>
          <p className="mt-4 text-red-500">{`Data ${heading} Kosong`}</p>
          <p className="text-red-500">
            Silahkan tambahkan melalui menu data master
          </p>
        </>
      );
    } else {
      return (
        multipleDropdownData[type] && (
          <InputSelect
            heading={heading}
            containerClassName="mt-0 w-full"
            prompt={conditionalPromptRender()}
            data={multipleDropdownData[type]}
          />
        )
      );
    }
  };

  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Tambah Les" />

      {/* <ConditionalDropdownRender type="mapel" heading="Mapel" /> */}
      {ConditionalDropdownRender("mapel", "Mapel")}

      {ConditionalDropdownRender("jenjangkelas", "Jenjang Kelas")}

      {ConditionalDropdownRender("paket", "Paket")}

      {ConditionalDropdownRender("wilayah", "Wilayah")}

      <InputText label="Harga" placeholder="Masukkan harga pilihan les" />

      <InputText label="Fee Tutor" placeholder="Masukkan besar Fee tutor" />

      <Button
        type="submit"
        text="Simpan"
        additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 w-full rounded-full"
        onClick={() => {}}
      />
    </ContentContainer>
  );
};

export default AddListCourse;
