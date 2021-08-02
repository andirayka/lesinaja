import React, { useState, useEffect } from "react";
import {
  ContentContainer,
  InputText,
  SectionTitle,
  InputRadio,
  InputTextarea,
  InputFile,
  Skeleton,
  Button,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const FormTutor = () => {
  const [loading, setLoading] = useState(true);

  const { state: prevData } = useLocation();

  const [data, setData] = useState({});

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Pecobaan submit file");
    let fileNew = `fiqri_${file}`;
    console.log(fileNew);
  };

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({
      ref: `user_role/tutor/${prevData.id}`,
    });
    setData(getData);
    setLoading(false);
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  if (loading) {
    return (
      <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
        <SectionTitle heading="Loading..." />
        <Skeleton mainCount={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </ContentContainer>
    );
  } else {
    return (
      <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
        <SectionTitle heading="Detail Tutor/Pengajar" />

        <InputFile
          onChange={handleFileChange}
          image={
            "https://img.okezone.com/content/2021/01/23/194/2349461/potret-cantik-menantu-bule-bambang-trihatmodjo-pakai-kebaya-netizen-kayak-barbie-26ytjfjCXz.jpg"
          }
        />

        <Button
          text="Simpan Gambar"
          additionalClassName="bg-yellow-500"
          onClick={handleSubmit}
        />

        <InputText disabled label="Nama" value={data.nama} />

        <InputText disabled label="Email" value={data.email} />

        <InputText disabled label="Nomor WA" value={data.nomor} />

        <InputRadio heading="Jenis Kelamin" />
        <InputRadio
          id="pria"
          label="Laki - Laki"
          value="pria"
          checked={data.gender == "pria" && "checked"}
        />
        <InputRadio
          id="wanita"
          label="Perempuan"
          value="wanita"
          checked={data.gender == "wanita" && "checked"}
        />

        <InputText disabled label="Provinsi" value={data.provinsi} />

        <InputText disabled label="Kabupaten/kota" value={data.kabupaten} />

        <InputText disabled label="Kecamatan" value={data.kecamatan} />

        <InputText disabled label="Desa" value={data.desa} />

        <InputTextarea disabled heading="Alamat" value={data.alamat} />

        <InputText
          disabled
          value={data.perguruan_tinggi}
          label="Perguruan Tinggi"
        />

        <InputText disabled value={data.jurusan} label="Jurusan" />

        <InputText disabled label="Mapel yang dikuasai" value={data.matkul} />

        <InputRadio heading="Apakah pernah memberi les atau mengajar sebelumnya?" />
        <InputRadio
          id="yes"
          label="Ya"
          value="yes"
          checked={data.pengalaman == "yes" && "checked"}
        />
        <InputRadio
          id="no"
          label="Tidak"
          value="no"
          checked={data.pengalaman == "no" && "checked"}
        />

        <InputText
          disabled
          label="Jika pernah, sebutkan semua pengalaman mengajar yang pernah anda lakukan"
          value={data.pengalaman_mengajar}
        />

        <InputText disabled label="Bank" value={data.bank} />

        <InputText disabled label="Rekening" value={data.rekening} />
      </ContentContainer>
    );
  }
};

export default FormTutor;
