import React from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
} from "@components";
import { logregLogo } from "@assets";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { handleLogin } from "@utils";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    const { success } = await handleLogin(data.email, data.password);

    if (success) {
      history.push("/beranda");
    } else {
      alert("Data yang ada masukkan salah");
    }
    // console.log(data);
    // console.log(errors);
    // history.push("/beranda");
  };

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
      <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6">
        <SectionTitle
          heading="Masuk"
          body="Ayo masuk ke akunmu untuk mulai belajar/mengajar"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Email"
            useHookRegister={register("email", {
              required: "Email harus diisi",
            })}
            placeholder="Contoh: handoko@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("password", {
              required: "Kata sandi harus diisi",
            })}
            placeholder="Masukkan kata sandi Anda"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            text="Masuk"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />

          <p className="text-center mt-4">
            Belum punya akun?{" "}
            <Link className="text-blue-600" to={{ pathname: "/daftar" }}>
              Daftar di sini
            </Link>
          </p>
        </form>
      </ContentContainer>
    </div>
  );
};

export default Login;
