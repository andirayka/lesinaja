import React, { useState, useEffect } from "react";
import {
  ContentContainer,
  InputText,
  SectionTitle,
  InputTextarea,
  Skeleton,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const FormWalmur = () => {
  const [loading, setLoading] = useState(true);

  const { state: prevData } = useLocation();

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({
      ref: `user_role/wali_murid/${prevData.id}`,
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
        <SectionTitle heading="Detail Wali Murid" />

        <InputText disabled label="Nama" value={data.nama} />

        <InputText disabled label="Email" value={data.email} />

        <InputText disabled label="Nomor WA" value={data.nomor} />

        <InputText disabled label="Pekerjaan" value={data.pekerjaan} />

        <InputText disabled label="Provinsi" value={data.provinsi} />

        <InputText disabled label="Kabupaten/kota" value={data.kabupaten} />

        <InputText disabled label="Kecamatan" value={data.kecamatan} />

        <InputText disabled label="Desa" value={data.desa} />

        <InputTextarea disabled heading="Alamat" value={data.alamat} />
      </ContentContainer>
    );
  }
};

export default FormWalmur;
