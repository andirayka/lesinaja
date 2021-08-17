import React, { useState, useEffect } from "react";
import {
  InputText,
  Title,
  InputRadio,
  InputTextarea,
  InputFile,
  LoadIcon,
  SkeletonLoading,
} from "@components";
import { useLocation } from "react-router-dom";
import { getFirebaseDataOnce, handleShowFile } from "@utils";
// import { getFirebaseDataOnce, handleShowFile, handleUploadFile } from "@utils";

export const FormTutor = () => {
  const [loading, setLoading] = useState(true);
  const [profileSrc, setProfileSrc] = useState("");

  const { state: prevData } = useLocation<any>();

  const [dataUser, setDataUser] = useState<any>({});

  const [dataUserRole, setDataUserRole] = useState<any>({});

  const [dataMapel, setDataMapel] = useState<any>(null);

  const [dataJenjang, setDataJenjang] = useState<any>(null);

  const [wilayah, setWilayah] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
  });

  // const [fileUpload, setFileUpload] = useState(null);

  //Mengambil data user dan user_role
  const getDataFirebase = async () => {
    const getDataUserRole = await getFirebaseDataOnce(
      `user_role/tutor/${prevData.id}`
    );
    setDataUserRole(getDataUserRole);

    const getDataUser = await getFirebaseDataOnce(`user/${prevData.id}`);
    setDataUser(getDataUser);

    getDataMapelFirebase(getDataUserRole);

    getDataJenjangFirebase(getDataUserRole);

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

  // mengambil data mapel pada master_mapel
  const getDataMapelFirebase = async (dataUserRole: any) => {
    let listMapel: any = [];
    for (let i = 0; i < dataUserRole.mapel_ahli.length; i++) {
      const element = dataUserRole.mapel_ahli[i];

      const getDataMapel = await getFirebaseDataOnce(
        `master_mapel/${element}/nama`
      );

      listMapel = [...listMapel, getDataMapel];
    }

    setDataMapel(listMapel);
  };

  const getDataJenjangFirebase = async (data: any) => {
    let listJenjang: any = [];
    for (let i = 0; i < data.jenjang_ahli.length; i++) {
      const element = data.jenjang_ahli[i];

      const getDataJenjang = await getFirebaseDataOnce(
        `master_jenjangkelas/${element}/nama`
      );

      listJenjang = [...listJenjang, getDataJenjang];
    }

    setDataJenjang(listJenjang);
  };

  // mengambil gambar
  const showImage = () => {
    let fileNew = `foto_tutor/${prevData.id}`;
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
      <div className="flex-grow bg-white rounded-lg p-6 md:ml-8 md:mr-8">
        <Title title="Loading..." type="cardItem" titleClassName="text-2xl" />
        <SkeletonLoading fullWidthLineCount={10} />
      </div>
    );
  } else {
    return (
      <div className="flex-grow bg-white rounded-lg p-6 md:ml-8 md:mr-8">
        <Title
          title="Detail Tutor/Pengajar"
          type="cardItem"
          titleClassName="text-2xl"
        />

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

        <div className="mt-4">
          <label className="font-medium">Mapel yang dikuasai</label>
          {dataMapel &&
            dataMapel.map((item: string, index: number) => {
              return (
                <div key={index} className="border-b-2 px-2">
                  <div className="list-item ml-5">{item}</div>
                </div>
              );
            })}
        </div>

        <div className="mt-4">
          <label className="font-medium">
            Jenjang Kelas mengajar yang di inginkan
          </label>
          {dataJenjang &&
            dataJenjang.map((item: string, index: number) => {
              return (
                <div key={index} className="border-b-2 px-2">
                  <div className="list-item ml-5">{item}</div>
                </div>
              );
            })}
        </div>

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
      </div>
    );
  }
};
