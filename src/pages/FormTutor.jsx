import React, { useState, useEffect, useContext } from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
  InputRadio,
  InputTextarea,
  InputFile,
  Skeleton,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";
import { ContextMaster } from "@context";

const FormTutor = () => {
  const {
    state: { listData, listStatus },
    getListData,
  } = useContext(ContextMaster);

  const { state: prevData } = useLocation();

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({
      ref: `user_role/tutor/${prevData.id}`,
    });
    // console.log(data);
    setData(getData);
  };

  useEffect(() => {
    getListData();
    getDataFirebase();
  }, []);

  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Detail Tutor/Pengajar" />

      {listStatus == "loading" && (
        <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} subCount={[1, 2]} />
      )}

      {listData && (
        <div>
          <InputFile
            disabled
            image={
              "https://img.okezone.com/content/2021/01/23/194/2349461/potret-cantik-menantu-bule-bambang-trihatmodjo-pakai-kebaya-netizen-kayak-barbie-26ytjfjCXz.jpg"
            }
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
        </div>
      )}
    </ContentContainer>
  );
};

export default FormTutor;
