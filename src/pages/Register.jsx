import React, { useRef } from "react";
import {
  ContentContainer,
  InputText,
  InputRadio,
  InputPassword,
  SectionTitle,
  Button,
} from "@components";
import { logregLogo } from "@assets";
import { useForm } from "react-hook-form";
import { handleRegister } from "@utils";
import { useHistory } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});

  password.current = watch("password", "");

  const history = useHistory();

  const onSubmit = async (data) => {
    if (data.password == data.repeatPassword) {
      const { success } = await handleRegister(data.email, data.password);

      if (success) {
        history.push("/akun");
      } else {
        alert("Data yang ada masukkan sudah ada");
      }
    } else {
      alert("Kata sandi tidak sama dengan kata sandi sebelumnya");
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
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {/* {validEmail && <p className="text-red-500">Format email salah</p>} */}

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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <InputPassword
            label="Ulangi Kata Sandi"
            useHookRegister={register("repeatPassword", {
              validate: (value) =>
                value === password.current || "password beda",
            })}
            placeholder="Masukkan ulang kata sandi Anda"
          />
          {errors.repeatPassword && (
            <p className="text-red-500">{errors.repeatPassword.message}</p>
          )}

          <InputRadio heading="Saya adalah" />
          <InputRadio
            id="walimurid"
            label="Wali Murid"
            value="walmur"
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
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <Button
            type="submit"
            text="Daftar"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </form>
      </ContentContainer>
    </div>
  );
};

export default Register;
