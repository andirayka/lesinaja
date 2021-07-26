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

const AccountTutor = () => {
    return (
        <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
            <SectionTitle heading="Akun Tutor/Pengajar" />

            <InputFile 
                image={"https://img.okezone.com/content/2021/01/23/194/2349461/potret-cantik-menantu-bule-bambang-trihatmodjo-pakai-kebaya-netizen-kayak-barbie-26ytjfjCXz.jpg"}
            />

            <InputText
                label="Nama"
                placeholder="Contoh: Admin Abdullah"
            />

            <InputText
                label="Email"
                placeholder="Masukkan Email Anda"
            />

            <InputText
                label="Nomor WA"
                placeholder="Contoh: 089871871724"
            />

            <InputRadio heading="Jenis Kelamin" />
            {[
                { id: 1, role: 'Laki-Laki', radioItem: 'laki-laki' },
                { id: 2, role: 'Perempuan', radioItem: 'perempuan' },
            ].map(({ id, radioItem, role }) => {
                return <InputRadio key={id} id={radioItem} label={role} />;
            })}

            <InputSelect 
                heading="Provinsi" 
            />

            <InputSelect 
                heading="Kabupaten/Kota" 
            />

            <InputSelect
                heading="Kecamatan" 
            />

            <InputText
                label="Desa"
                placeholder="Masukkan nama desa anda"
            />

            <InputTextarea 
                heading="Alamat"
                placeholder="Masukkan alamat lengkap anda"
            />

            <InputText
                label="Perguruan Tinggi"
                placeholder="Nama Perguruan Tinggi"
            />

            <InputText
                label="Jurusan"
                placeholder="Jurusan"
            />

            <InputSelect 
                heading="Mapel yang dikuasai" 
            />

            <InputRadio heading="Apakah pernah memberi les atau mengajar sebelumnya?" />
            {[
                { id: 1, role: 'Ya', radioItem: 'ya' },
                { id: 2, role: 'Tidak', radioItem: 'Tidak' },
            ].map(({ id, radioItem, role }) => {
                return <InputRadio key={id} id={radioItem} label={role} />;
            })}

            <InputText
                label="Jika pernah, sebutkan semua pengalaman mengajar yang pernah anda lakukan"
                placeholder="Masukkan pengalaman anda satu persatu"
            />

            <InputText
                label="Bank"
                placeholder="Masukkan nama bank anda"
            />

            <InputText
                label="Rekening"
                placeholder="Masukkan rekening anda"
            />

            <Button
                text="Simpan"
                additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
                onClick={() => {}}
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
    )
}

export default AccountTutor