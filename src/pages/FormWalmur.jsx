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

  const [dataUser, setDataUser] = useState({});

  const [dataUserRole, setDataUserRole] = useState({});

  const [wilayah, setWilayah] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  // mengambil data user dan user role di firebase
  const getDataFirebase = async () => {
    const getDataUserRole = await getFirebaseDataOnce({
      ref: `user_role/wali_murid/${prevData.id}`,
    });
    setDataUserRole(getDataUserRole);

    const getDataUser = await getFirebaseDataOnce({
      ref: `user/${prevData.id}`,
    });
    setDataUser(getDataUser);

    getDataWilayahFirebase(getDataUser);
    setLoading(false);
  };

  // mengambil data wilayah rumah
  const getDataWilayahFirebase = async (data) => {
    let wilayahRumah = data.kontak.id_desa;
    let idProvinsi = wilayahRumah.substring(0, 2);
    let idKabupaten = wilayahRumah.substring(0, 4);
    let idKecamatan = wilayahRumah.substring(0, 7);
    let idDesa = wilayahRumah.substring(0, 10);

    const getDataProvinsi = await getFirebaseDataOnce({
      ref: `wilayah_provinsi/${idProvinsi}/nama`,
    });
    const getDataKabupaten = await getFirebaseDataOnce({
      ref: `wilayah_kabupaten/${idProvinsi}/${idKabupaten}/nama`,
    });
    const getDataKecamatan = await getFirebaseDataOnce({
      ref: `wilayah_kecamatan/${idProvinsi}/${idKabupaten}/${idKecamatan}/nama`,
    });
    const getDataDesa = await getFirebaseDataOnce({
      ref: `wilayah_desa/${idProvinsi}/${idKabupaten}/${idKecamatan}/${idDesa}/nama`,
    });

    setWilayah({
      provinsi: getDataProvinsi,
      kabupaten: getDataKabupaten,
      kecamatan: getDataKecamatan,
      desa: getDataDesa,
    });
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

        <InputText disabled label="Nama" value={dataUser.nama} />

        <InputText disabled label="Email" value={dataUser.email} />

        <InputText disabled label="Nomor WA" value={dataUser.kontak.telepon} />

        <InputText disabled label="Pekerjaan" value={dataUserRole.pekerjaan} />

        <InputText disabled label="Provinsi" value={wilayah.provinsi} />

        <InputText disabled label="Kabupaten/kota" value={wilayah.kabupaten} />

        <InputText disabled label="Kecamatan" value={wilayah.kecamatan} />

        <InputText disabled label="Desa" value={wilayah.desa} />

        <InputTextarea
          disabled
          heading="Alamat"
          value={dataUser.kontak.alamat_rumah}
        />
      </ContentContainer>
    );
  }
};

export default FormWalmur;
