import React, { useState, useEffect } from "react";
import {
  ContentContainer,
  InputText,
  SectionTitle,
  InputRadio,
  InputTextarea,
  InputFile,
  Skeleton,
  LoadIcon,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce, handleShowFile, handleUploadFile } from "@utils";

const FormTutor = () => {
  const [loading, setLoading] = useState(true);
  const [profileSrc, setProfileSrc] = useState("");

  const { state: prevData } = useLocation();

  const [dataUser, setDataUser] = useState({});

  const [dataUserRole, setDataUserRole] = useState({});

  const [dataMapel, setDataMapel] = useState(null);

  const [wilayah, setWilayah] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  // const [fileUpload, setFileUpload] = useState(null);

  //Mengambil data user dan user_role
  const getDataFirebase = async () => {
    console.log(prevData.id);
    const getDataUserRole = await getFirebaseDataOnce({
      ref: `user_role/tutor/${prevData.id}`,
    });
    setDataUserRole(getDataUserRole);

    const getDataUser = await getFirebaseDataOnce({
      ref: `user/${prevData.id}`,
    });
    setDataUser(getDataUser);

    await getDataMapelFirebase(getDataUserRole);

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

  // mengambil data mapel pada master_mapel
  const getDataMapelFirebase = async (dataUserRole) => {
    let listMapel = [];
    for (let i = 0; i < dataUserRole.mapel_ahli.length; i++) {
      const element = dataUserRole.mapel_ahli[i];

      const getDataMapel = await getFirebaseDataOnce({
        ref: `master_mapel/${element}/nama`,
      });

      listMapel = [...listMapel, getDataMapel];
    }

    setDataMapel(listMapel);
  };

  // mengambil gambar
  const showImage = () => {
    let fileNew = `foto_tutor/profil_${prevData.id}`;
    handleShowFile(fileNew).then((url) => {
      setProfileSrc(url);
    });
  };

  // mengambil data file
  // const handleUploadProfil = (event) => {
  //   console.log(event.target.files[0].type, event.target.files[0].size);
  //   const newFile = event.target.files[0];
  //   setFileUpload(newFile);
  // };

  // Upload file gambar
  // const handleSubmitUpload = () => {
  //   if (fileUpload.size >= 200000) {
  //     alert("Ukuran terlalu besar");
  //   } else if (fileUpload.type != "image/jpeg") {
  //     alert("File bukan gambar");
  //   } else {
  //     alert("Anda Berhasil Meng-Upload");
  //     const files = fileUpload;
  //     const fileNew = `foto_tutor/profil_${prevData.id}`;
  //     handleUploadFile(files, fileNew);
  //     showImage();
  //   }
  // };

  useEffect(() => {
    showImage();
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

        {!profileSrc ? (
          <LoadIcon additionalClassName="text-8xl" />
        ) : (
          <InputFile image={profileSrc} />
          // <InputFile image={profileSrc} isFile onChange={handleUploadProfil} />
        )}
        {/* <button onClick={handleSubmitUpload} className="px-4 py-2 bg-gray-500">
          Upload
        </button> */}
        <InputText disabled label="Nama" value={dataUser.nama} />

        <InputText disabled label="Email" value={dataUser.email} />

        <InputText disabled label="Nomor WA" value={dataUser.kontak.telepon} />

        <InputRadio heading="Jenis Kelamin" />
        <InputRadio
          id="pria"
          label="Laki - Laki"
          value="laki-laki"
          checked={dataUserRole.jenis_kelamin == "laki-laki" && "checked"}
        />
        <InputRadio
          id="wanita"
          label="Perempuan"
          value="perempuan"
          checked={dataUserRole.jenis_kelamin == "perempuan" && "checked"}
        />

        <InputText disabled label="Provinsi" value={wilayah.provinsi} />

        <InputText disabled label="Kabupaten/kota" value={wilayah.kabupaten} />

        <InputText disabled label="Kecamatan" value={wilayah.kecamatan} />

        <InputText disabled label="Desa" value={wilayah.desa} />

        <InputTextarea
          disabled
          heading="Alamat"
          value={dataUser.kontak.alamat_rumah}
        />

        <InputText
          disabled
          value={dataUserRole.perguruan_tinggi}
          label="Perguruan Tinggi"
        />

        <InputText disabled value={dataUserRole.jurusan} label="Jurusan" />

        <InputText disabled label="Mapel yang dikuasai" value={dataMapel} />

        <InputText
          disabled
          label="Semua pengalaman mengajar yang pernah dilakukan"
          value={dataUserRole.pengalaman_mengajar}
        />

        <InputText disabled label="Bank" value={dataUserRole.bank} />

        <InputText
          disabled
          label="Rekening"
          value={dataUserRole.nomor_rekening}
        />
      </ContentContainer>
    );
  }
};

export default FormTutor;
