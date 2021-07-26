import React from "react";
import { Title, CardItem, CardKeyValue, Button } from "@components";

const ListCourseTutor = () => {
    return (
        <div className="w-full flex-grow md:ml-8">
            <Title text="Daftar Les yang Anda Ajar" type="pageTitle" />

            {[1, 1].map((item, key) => {
                return (
                <CardItem
                    key={key}
                    title="Bhs. Inggris Kelas 3 SD (Sedang Berlangsung)"
                    containerClass="mt-8"
                >
                    <CardKeyValue keyName="Nama Wali Murit" value="Handoko Sucipto" />
                    <CardKeyValue keyName="No. WA Murid" value="089999999888" />
                    <CardKeyValue keyName="Nama Siswa" value="Intan Kusumastuti" />
                    <CardKeyValue keyName="Alamat" value="Intan Kusumastuti" />
                    <CardKeyValue keyName="Jadwal Les" value="Intan Kusumastuti" />
                    
                    <Button
                        text="Presensi Les"
                        additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium mr-4"
                        onClick={() => {}}
                    />
                </CardItem>
                );
            })}
        </div>
    )
}

export default ListCourseTutor