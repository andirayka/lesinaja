import React, { useState, useEffect } from "react";
import { InputText, Title, InputTextarea, SkeletonLoading } from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

export const FormWalmur = () => {
  const [loading, setLoading] = useState(true);

  const { state: prevData } = useLocation<any>();

  const [dataUser, setDataUser] = useState<any>({});

  const [dataUserRole, setDataUserRole] = useState<any>({});

  const [wilayah, setWilayah] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  // mengambil data user dan user role di firebase
  const getDataFirebase = async () => {
    const getDataUserRole = await getFirebaseDataOnce(
      `user_role/wali_murid/${prevData.id}`
    );
    setDataUserRole(getDataUserRole);

    const getDataUser = await getFirebaseDataOnce(`user/${prevData.id}`);
    setDataUser(getDataUser);

    getDataWilayahFirebase(getDataUser);
    setLoading(false);
  };

  // mengambil data wilayah rumah
  const getDataWilayahFirebase = async (data: any) => {
    let wilayahRumah = data.kontak.id_desa;
    let idProvinsi = wilayahRumah.substring(0, 2);
    let idKabupaten = wilayahRumah.substring(0, 4);
    let idKecamatan = wilayahRumah.substring(0, 7);
    let idDesa = wilayahRumah.substring(0, 10);

    const getDataProvinsi = await getFirebaseDataOnce(
      `wilayah_provinsi/${idProvinsi}/nama`
    );
    const getDataKabupaten = await getFirebaseDataOnce(
      `wilayah_kabupaten/${idProvinsi}/${idKabupaten}/nama`
    );
    const getDataKecamatan = await getFirebaseDataOnce(
      `wilayah_kecamatan/${idProvinsi}/${idKabupaten}/${idKecamatan}/nama`
    );
    const getDataDesa = await getFirebaseDataOnce(
      `wilayah_desa/${idProvinsi}/${idKabupaten}/${idKecamatan}/${idDesa}/nama`
    );

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
      <div className="flex-grow bg-white rounded-lg p-6">
        <Title
          title="Loading..."
          type="cardItem"
          titleClassName="text-2xl"
          itemClassName="p-0"
        />
        <SkeletonLoading fullWidthLineCount={10} />
      </div>
    );
  } else {
    return (
      <div className="flex-grow bg-white rounded-lg p-6">
        <Title
          title="Detail Wali Murid"
          type="cardItem"
          titleClassName="text-2xl"
          itemClassName="p-0"
        />

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
      </div>
    );
  }
};
