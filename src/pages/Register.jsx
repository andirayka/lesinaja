import React, { useRef, useContext } from "react";
import {
  ContentContainer,
  InputText,
  InputRadio,
  InputPassword,
  SectionTitle,
  Button,
  Swal,
  LoadIcon,
  FieldError,
} from "@components";
import { logregLogo } from "@assets";
import { useForm } from "react-hook-form";
import { handleRegister } from "@utils";
import { ContextMaster } from "@context";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(ContextMaster);

  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const { success, role } = await handleRegister(
      data.email,
      data.password,
      data.role
    );
    console.log(role);
    if (success) {
      setFormStatus();
      if (role.tutor) {
        alert("berhasil mendaftar sebagai tutor");
      } else {
        alert("Berhasil mendaftar sebagai walimurid");
      }
    } else {
      setFormStatus();
      Swal.fire({
        icon: "error",
        text: "Email yang Anda masukkan sudah ada",
        confirmButtonColor: "#FBBF24",
      });
    }
  };

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" al="" />
      <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6">
        <SectionTitle
          heading="Daftar Pengguna Baru"
          body="Daftarkan dirimu dan nikmati pengalaman belajar/mengajar yang asyik"
        />
        <form onSubmit={handleSubmit(onSubmit)} name="validation">
          <InputText
            label="Nama"
            useHookRegister={register("name", {
              required: "Nama harus diisi",
            })}
            placeholder="Contoh: Handoko Wahyudi"
          />
          {errors.name && <FieldError message={errors.name.message} />}

          <InputText
            name="email"
            label="Email"
            useHookRegister={register("email", {
              required: "Email harus diisi",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Format email yang Anda masukkan salah",
              },
            })}
            placeholder="Contoh: handoko@gmail.com"
          />
          {errors.email && <FieldError message={errors.email.message} />}

          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("password", {
              required: "Kata sandi harus diisi",
              minLength: {
                value: 8,
                message:
                  "Kata sandi yang anda masukkan harus minimal 8 karakter",
              },
            })}
            placeholder="Masukkan kata sandi Anda"
          />
          {errors.password && <FieldError message={errors.password.message} />}

          <InputPassword
            label="Ulangi Kata Sandi"
            useHookRegister={register("repeatPassword", {
              validate: (value) =>
                value === password.current || "password beda",
            })}
            placeholder="Masukkan ulang kata sandi Anda"
          />
          {errors.repeatPassword && (
            <FieldError message={errors.repeatPassword.message} />
          )}

          <InputRadio heading="Saya adalah" />
          <InputRadio
            id="walimurid"
            label="Wali Murid"
            value="walimurid"
            useHookRegister={register("role", {
              required: "pilih salah satu",
            })}
          />
          <InputRadio
            id="tutorpengajar"
            label="Tutor/Pengajar"
            value="tutor"
            useHookRegister={register("role", {
              required: "pilih salah satu",
            })}
          />
          {errors.role && <FieldError message={errors.role.message} />}

          <Button
            type="submit"
            text="Daftar"
            onClick={() => setFormStatus("refreshing")}
            loading={
              formStatus == "refreshing" && (
                <LoadIcon additionalClassName="text-2xl" />
              )
            }
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </form>
      </ContentContainer>
    </div>
  );
};

export default Register;
