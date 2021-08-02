import React, { useState, useEffect, useContext } from "react";
import {
  ContentContainer,
  InputText,
  // InputPassword,
  SectionTitle,
  Button,
  InputTextarea,
  Skeleton,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce, handleResetPassword } from "@utils";
import { ContextMaster } from "@context";

const FormWalmur = () => {
  const [email, setEmail] = useState();

  const {
    state: { listData, listStatus },
    getListData,
  } = useContext(ContextMaster);

  const { state: prevData } = useLocation();

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({
      ref: `user_role/wali_murid/${prevData.id}`,
    });
    // console.log(data);
    setData(getData);
  };

  const handlePasswordChange = (event) => {
    let emailNew = { ...email };
    emailNew = event.target.value;
    setEmail(emailNew);
    // console.log(email);
  };

  const handleSubmitReset = async () => {
    const { success } = await handleResetPassword(email || data.email);

    if (success) {
      alert("Lihat di email anda");
    } else {
      alert("proses gaga");
    }
    // console.log(value.email);
  };

  useEffect(() => {
    getListData();
    getDataFirebase();
  }, []);

  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      <SectionTitle heading="Detail Wali Murid" />

      {listStatus == "loading" && (
        <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} subCount={[1, 2]} />
      )}

      {listData && (
        <div>
          <InputText disabled label="Nama" value={data.nama} />

          <InputText disabled label="Email" value={data.email} />

          <InputText disabled label="Nomor WA" value={data.nomor} />

          <InputText disabled label="Pekerjaan" value={data.pekerjaan} />

          <InputText disabled label="Provinsi" value={data.provinsi} />

          <InputText disabled label="Kabupaten/kota" value={data.kabupaten} />

          <InputText disabled label="Kecamatan" value={data.kecamatan} />

          <InputText disabled label="Desa" value={data.desa} />

          <InputTextarea disabled heading="Alamat" value={data.alamat} />

          <SectionTitle heading="Reset Kata Sandi" containerClass="mt-10" />

          <InputText
            label="Email"
            name="email"
            value={data.email}
            onChange={handlePasswordChange}
            placeholder="Masukkan kata sandi baru Anda"
          />

          <Button
            text="Simpan"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
            onClick={handleSubmitReset}
          />
        </div>
      )}
    </ContentContainer>
  );
};

export default FormWalmur;
