import { Button, CardItem, InputText, InputTextarea, Rating, SectionContent, Title } from "@components";
import React from "react";

const PresensiLesWalmur = () => {
    return (
        <div className="w-full md:ml-8">
            <Title type="pageTitle" text="Presensi Les Bhs. Inggris Kelas 3 SD" />
            <CardItem
            title="Rabu, 7 Juli 2021, 08:00-09:30"
            containerClass="mt-8"
            >
                <Button text="Ubah Jadwal" additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg mt-5 ml-4 px-14 font-bold" />
                
                <SectionContent text="Rating Les" >
                    <Rating />

                    <InputTextarea placeholder="Masukkan Komentar Anda" />

                    <Button text="Simpan Rating" additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg mt-5" />
                </SectionContent>

                <SectionContent text="Data Perkembangan Siswa" >
                    <InputText label="Tutor" value="Bambang Om" disabled />

                    <InputText label="Materi" value="Berenang doang" disabled />

                    <InputText label="Laporan" value="Terimakasih telah menyewa saya ya Om" disabled />
                </SectionContent>
            </CardItem>
        </div>
    )
}

export default PresensiLesWalmur