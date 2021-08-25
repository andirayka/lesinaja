import React, { useState, useEffect, useContext } from "react";
import {
  InputText,
  Title,
  InputRadio,
  InputTextarea,
  InputFile,
  LoadIcon,
  SkeletonLoading,
  InputSelect,
  Button,
  FieldError,
} from "@components";
import { IconProfile } from "@assets";
import {
  addFirebaseData,
  getFirebaseDataOnce,
  handleShowFile,
  handleUploadFile,
} from "@utils";
import { useForm } from "react-hook-form";
import { MasterContext } from "@context";

export const AccountTutor = () => {
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState<any | null>({});
  const [dataUserRole, setDataUserRole] = useState<any | null>({});
  const [idUser, setIdUser] = useState<string | null>("");

  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(MasterContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getDataFirebase = async (idUser: string | null) => {
    const getDataUser = await getFirebaseDataOnce(`user/${idUser}`);
    setDataUser(getDataUser);

    const getDataUserRole = await getFirebaseDataOnce(
      `user_role/tutor/${idUser}`
    );
    setDataUserRole(getDataUserRole);

    setLoading(false);
    setFormStatus();
    handleChangeForm(getDataUser, getDataUserRole);
  };

  // mengambil data file
  const handleUploadProfil = (event: any) => {
    console.log(event.target.files[0].type, event.target.files[0].size);
    const newFile = event.target.files[0];
    handleSubmitUpload(newFile);
  };

  // Upload file gambar
  const handleSubmitUpload = (data: any) => {
    if (data.size >= 500000) {
      alert("Ukuran terlalu besar");
    } else if (data.type != "image/jpeg" && data.type != "image/png") {
      alert("File bukan gambar");
    } else {
      alert("Anda Berhasil Meng-Upload");
      const files = data;
      const fileNew = `foto_tutor/${idUser}`;
      handleUploadFile(files, fileNew);
      showImage();
    }
  };

  // mengambil link gambar dan di taruh di user_role
  const showImage = () => {
    let fileNew = `foto_tutor/${idUser}`;
    handleShowFile(fileNew).then((url: string) => {
      addFirebaseData({
        ref: `user_role/tutor/${idUser}/link_foto`,
        isNoKey: true,
        payload: url,
      });
      getDataFirebase(idUser);
    });
  };

  const onSubmit = (data: any) => {
    // console.log(data);

    //Tambah data user
    addFirebaseData({
      ref: `user/${idUser}/email`,
      payload: data.email,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user/${idUser}/nama`,
      payload: data.nama,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user/${idUser}/kontak`,
      payload: {
        alamat_rumah: data.alamat_rumah,
        // id_desa: data.id_desa,
        telepon: data.telepon,
      },
      isNoKey: true,
    });

    // Tambah data user_role
    addFirebaseData({
      ref: `user_role/tutor/${idUser}`,
      payload: {
        // jenjang_ahli: data.jenjang_ahli,
        // mapel_ahli: data.mapel_ahli,
      },
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/bank`,
      payload: data.bank,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/jenis_kelamin`,
      payload: data.gender,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/jurusan`,
      payload: data.jurusan,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/link_microteaching`,
      payload: data.link_microteaching,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/nomor_rekening`,
      payload: data.nomor_rekening,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/pengalaman_mengajar`,
      payload: data.pengalaman_mengajar,
      isNoKey: true,
    });
    addFirebaseData({
      ref: `user_role/tutor/${idUser}/perguruan_tinggi`,
      payload: data.perguruan_tinggi,
      isNoKey: true,
    });

    showImage();

    getDataFirebase(idUser);
  };

  const handleChangeForm = (user: any, user_role: any) => {
    setValue("nama", user.nama);
    setValue("email", user.email);
    setValue("alamat_rumah", user.kontak.alamat_rumah);
    setValue("telepon", user.kontak.telepon);
    setValue("bank", user_role.bank);
    setValue("jurusan", user_role.jurusan);
    setValue("link_microteaching", user_role.link_microteaching);
    setValue("nomor_rekening", user_role.nomor_rekening);
    setValue("pengalaman_mengajar", user_role.pengalaman_mengajar);
    setValue("perguruan_tinggi", user_role.perguruan_tinggi);
    setValue("gender", user_role.jenis_kelamin);
  };

  useEffect(() => {
    const getData: string | null = localStorage.getItem("IdUser");
    setIdUser(getData);
    getDataFirebase(getData);
    console.log(getData);
  }, []);

  if (loading) {
    return (
      <div className="flex-grow bg-white rounded-lg p-6 shadow-lg">
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
      <div className="flex-grow bg-white rounded-lg p-6 shadow-lg">
        <Title
          title="Akun Tutor/Pengajar"
          type="cardItem"
          titleClassName="text-2xl"
          itemClassName="p-0"
        />

        <InputFile
          isFile={true}
          image={dataUserRole ? dataUserRole.link_foto : IconProfile}
          onChange={handleUploadProfil}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Nama"
            placeholder="Masukkan Nama Lengkap Anda"
            useHookRegister={register("nama", {
              required: "Nama harus diisi",
            })}
          />
          {errors.nama && <FieldError message={errors.nama.message} />}

          <InputText
            label="Email"
            placeholder="Masukkan Email Anda"
            useHookRegister={register("email", {
              required: "Email harus diisi",
            })}
          />
          {errors.email && <FieldError message={errors.email.message} />}

          <InputText
            label="Nomor WA"
            placeholder="Masukkan Nomor whatsapp Anda"
            useHookRegister={register("telepon", {
              required: "Nomor WA harus diisi",
            })}
          />
          {errors.telepon && <FieldError message={errors.telepon.message} />}

          <InputRadio heading="Jenis Kelamin" />
          <InputRadio
            name="gender"
            id="pria"
            label="Laki - Laki"
            value="laki-laki"
            useHookRegister={register("gender", {
              required: "Jenis Kelamin harus diisi",
            })}
          />
          <InputRadio
            name="gender"
            id="wanita"
            label="Perempuan"
            value="perempuan"
            useHookRegister={register("gender", {
              required: "Jenis Kelamin harus diisi",
            })}
          />
          {errors.gender && <FieldError message={errors.gender.message} />}

          <InputText label="Provinsi" />

          <InputText label="Kabupaten/kota" />

          <InputText label="Kecamatan" />

          <InputText label="Desa" />

          <InputTextarea
            heading="Alamat"
            placeholder="Masukkan alamat lengkap tempat tinggal anda"
            useHookRegister={register("alamat_rumah", {
              required: "Alamat rumah harus diisi",
            })}
          />
          {errors.alamat_rumah && (
            <FieldError message={errors.alamat_rumah.message} />
          )}

          <InputText
            label="Perguruan Tinggi"
            placeholder="Masukkan nama perguruan tinggi"
            value={dataUserRole && dataUserRole.perguruan_tinggi}
            useHookRegister={register("perguruan_tinggi", {
              required: "Nama perguruan tinggi harus diisi",
            })}
          />
          {errors.perguruan_tinggi && (
            <FieldError message={errors.perguruan_tinggi.message} />
          )}

          <InputText
            label="Jurusan"
            placeholder="Masukkan jurusan Anda"
            value={dataUserRole && dataUserRole.jurusan}
            useHookRegister={register("jurusan", {
              required: "Jurusan harus diisi",
            })}
          />
          {errors.jurusan && <FieldError message={errors.jurusan.message} />}

          <InputText label="Pilih Pelajaran Ahli" />

          <InputText label="Pilih Jenjang Ahli" />

          <InputText
            label="Pengalaman Mengajar"
            placeholder="Masukkan semua pengalaman mengajar Anda"
            value={dataUserRole && dataUserRole.pengalaman_mengajar}
            useHookRegister={register("pengalaman_mengajar", {
              required: "Pengalaman mengajar harus diisi",
            })}
          />
          {errors.pengalaman_mengajar && (
            <FieldError message={errors.pengalaman_mengajar.message} />
          )}

          <InputText
            label="Link Microteaching"
            placeholder="Masukkan link cara mengajar Anda"
            value={dataUserRole && dataUserRole.link_microteaching}
            useHookRegister={register("link_microteaching", {
              required: "Link Microteaching harus diisi",
            })}
          />
          {errors.link_microteaching && (
            <FieldError message={errors.link_microteaching.message} />
          )}

          <InputText
            label="Bank"
            placeholder="Masukkan nama Bank Anda"
            value={dataUserRole && dataUserRole.bank}
            useHookRegister={register("bank", {
              required: "Nama Bank harus diisi",
            })}
          />
          {errors.bank && <FieldError message={errors.bank.message} />}

          <InputText
            label="Rekening"
            placeholder="Masukkan Rekening Anda"
            value={dataUserRole && dataUserRole.nomor_rekening}
            useHookRegister={register("nomor_rekening", {
              required: "Nomor Rekening harus diisi",
            })}
          />
          {errors.nomor_rekening && (
            <FieldError message={errors.nomor_rekening.message} />
          )}

          <Button
            type="submit"
            text="Simpan Profil"
            onClick={() => setFormStatus("refreshing")}
            loading={
              formStatus == "refreshing" && (
                <LoadIcon additionalClassName="text-2xl" />
              )
            }
            additionalClassName="my-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </form>
      </div>
    );
  }
};
