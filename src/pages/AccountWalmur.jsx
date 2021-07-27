import { Button, ContentContainer, InputPassword, InputSelect, InputText, InputTextarea, SectionTitle } from "@components";
import React from "react";

const AccountWalmur = () => {
    return (
        <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
            <SectionTitle heading="Akun Wali Murid" />

            <InputText label="Nama" placeholder="Masukkan nama Anda" />

            <InputText label="Email" placeholder="Masukkan Email Anda" />

            <InputText label="Nomor WA" placeholder="Masukkan nomor WA Anda" />

            <InputText label="Pekerjaan" placeholder="Apa pekerjaan Anda saat ini" />

            <InputSelect heading="Provinsi" />

            <InputSelect heading="Kota/Kabupaten" />

            <InputSelect heading="Kecamatan" />

            <InputSelect heading="Desa/Kelurahan" />

            <InputTextarea heading="Alamat" placeholder="Masukkan alamat lengkap Anda" />

            <Button text="Simpan" additionalClassName="w-full font-medium bg-yellow-400 hover:bg-yellow-600 rounded-full" />

            <SectionTitle heading="Ganti Kata Sandi" containerClass="mt-8" />

            <InputPassword label="Kata sandi lama" placeholder="Masukkan kata sandi lama Anda" />

            <InputPassword label="Kata sandi baru" placeholder="Masukkan kata sandi baru" />

            <InputPassword label="Ulangi kata sandi" placeholder="Ulangi kata sandi" />

            <Button text="Simpan" additionalClassName="w-full font-medium bg-yellow-400 hover:bg-yellow-600 rounded-full" />
        </ContentContainer>
    )
}

export default AccountWalmur