import {
  ContentContainer,
  SectionTitle,
  InputSelect,
  InputText,
  InputRadio,
  Button,
} from "@components";
import React from "react";

const AddListCourse = () => {
  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Tambah Les" />

      <InputSelect heading="Mapel" />

      <InputSelect heading="Jenjang Kelas" />

      <InputSelect heading="Wilayah" />

      <InputRadio heading="Jenis Kelamin" />
      {[
        { id: 1, role: "Paket 1 (4 Pertemuan)", radioItem: "paket 1" },
        { id: 2, role: "Paket 2 (8 Pertemuan)", radioItem: "paket 2" },
        { id: 2, role: "Paket 3 (12 Pertemuan)", radioItem: "paket 3" },
      ].map(({ id, radioItem, role }) => {
        return <InputRadio key={id} id={radioItem} label={role} />;
      })}

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
