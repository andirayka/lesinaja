import React from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
  InputRadio,
  InputSelect,
  InputTextarea,
  InputFile,
} from "@components";
import { useLocation } from "react-router-dom";

const FormTutor = () => {
  const { state: prevData } = useLocation();
  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Detail Tutor/Pengajar" />

      <InputFile
        disabled
        image={
          "https://img.okezone.com/content/2021/01/23/194/2349461/potret-cantik-menantu-bule-bambang-trihatmodjo-pakai-kebaya-netizen-kayak-barbie-26ytjfjCXz.jpg"
        }
      />

      <InputText
        disabled
        label="Nama"
        value={prevData.name}
        placeholder="Contoh: Admin Abdullah"
      />

      <InputText
        disabled
        label="Email"
        value={prevData.email}
        placeholder="Masukkan Email Anda"
      />

      <InputText
        disabled
        label="Nomor WA"
        value={prevData.nomor}
        placeholder="Contoh: 089871871724"
      />

      <InputRadio heading="Jenis Kelamin" />
      {[
        { id: 1, role: "Laki-Laki", radioItem: "laki-laki" },
        { id: 2, role: "Perempuan", radioItem: "perempuan" },
      ].map(({ id, radioItem, role }) => {
        return <InputRadio key={id} id={radioItem} label={role} />;
      })}

      <InputSelect disabled heading="Provinsi" />

      <InputSelect disabled heading="Kabupaten/Kota" />

      <InputSelect disabled heading="Kecamatan" />

      <InputText
        disabled
        label="Desa"
        value="Prambon Om"
        placeholder="Masukkan nama desa anda"
      />

      <InputTextarea
        disabled
        value="Desa Prambon, Kecamatan Prambon, Sidoarjo"
        heading="Alamat"
        placeholder="Masukkan alamat lengkap anda"
      />

      <InputText
        disabled
        value="PENS Om"
        label="Perguruan Tinggi"
        placeholder="Nama Perguruan Tinggi"
      />

      <InputText
        disabled
        value="Informatika"
        label="Jurusan"
        placeholder="Jurusan"
      />

      <InputSelect disabled heading="Mapel yang dikuasai" />

      <InputRadio heading="Apakah pernah memberi les atau mengajar sebelumnya?" />
      {[
        { id: 1, role: "Ya", radioItem: "ya" },
        { id: 2, role: "Tidak", radioItem: "Tidak" },
      ].map(({ id, radioItem, role }) => {
        return <InputRadio key={id} id={radioItem} label={role} />;
      })}

      <InputText
        disabled
        value="Berenang dan mengaji Om"
        label="Jika pernah, sebutkan semua pengalaman mengajar yang pernah anda lakukan"
        placeholder="Masukkan pengalaman anda satu persatu"
      />

      <InputText
        disabled
        value="Mandiri"
        label="Bank"
        placeholder="Masukkan nama bank anda"
      />

      <InputText
        disabled
        value="Rahasia Om"
        label="Rekening"
        placeholder="Masukkan rekening anda"
      />

      <SectionTitle heading="Reset Kata Sandi" containerClass="mt-10" />

      <InputPassword
        label="Kata Sandi"
        placeholder="Masukkan kata sandi baru Anda"
      />

      <InputPassword
        label="Kata Sandi"
        placeholder="Masukkan kembali kata sandi baru Anda"
      />

      <Button
        text="Simpan"
        additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
        onClick={() => {}}
      />
    </ContentContainer>
  );
};

export default FormTutor;
