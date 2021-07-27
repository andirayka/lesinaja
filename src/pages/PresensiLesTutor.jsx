import { Button, CardItem, InputText, InputTextarea, Rating, SectionContent, Title } from "@components";
import React from "react";

const PresensiLesTutor = () => {
    return (
        <div className="w-full md:ml-8">
            <Title type="pageTitle" text="Presensi Les Bhs. Inggris Kelas 3 SD (Sedang Berlangsung)" />
            <CardItem
            title="Rabu, 7 Juli 2021, 08:00-09:30"
            containerClass="mt-8"
            >
                <SectionContent text="Rating Les" >
                    <Rating />

                    <InputTextarea value="Mantap Om pean lak ngajar" disabled />
                </SectionContent>

                <SectionContent text="Data Perkembangan Siswa" >
                    <InputText label="Materi" placeholder="Masukkan materi yang diajar" />
                    <InputText label="Laporan" placeholder="Masukkan Laporan pada hari ini" />

                    <Button text="Simpan Laporan" additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg mt-5" />
                </SectionContent>
            </CardItem>
        </div>
    )
}

export default PresensiLesTutor