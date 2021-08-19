import React, { useContext, useEffect, useState } from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  Button,
  LoadIcon,
  Swal,
  FieldError,
  Title,
} from "@components";
import { logregLogo } from "@assets";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { handleLoginEmail, handleLoginGoogleFirebase } from "@utils";
import { Link } from "react-router-dom";
import { AuthContext, MasterContext } from "@context";

export const Login = () => {
  const { setIsLoggedIn } = useContext<any>(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [roleOn, setRoleOn] = useState<string | null>(null);

  const history = useHistory();

  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(MasterContext);

  const onSubmit = async (data: any) => {
    const { success, role } = await handleLoginEmail(data.email, data.password);

    console.log(role);
    if (success) {
      setIsLoggedIn(true);
      if (role && role.admin) {
        history.push("/beranda");
      }
      setFormStatus();
    } else {
      setFormStatus();
      Swal.fire({
        icon: "error",
        text: "Data yang anda masukkan salah",
        confirmButtonColor: "#FBBF24",
      });
    }
  };

  const handleLoginGoogle = async () => {
    setFormStatus("refreshing");
    const { success, role } = await handleLoginGoogleFirebase();

    if (success) {
      setIsLoggedIn(true);
      if (roleOn == "tutor") {
        if (role && role.tutor) {
          history.push("/beranda-tutor");
        } else {
          alert("Akun belum terdaftar sebagai Tutor");
          history.push("/akun-tutor");
        }
      } else if (roleOn == "walmur") {
        if (role && role.wali_murid) {
          // history.push("/beranda-tutor");
        } else {
          alert("Akun belum terdaftar sebagai Walimurid");
          // history.push("/akun-walmur");
        }
      }
      setFormStatus();
    } else {
      setFormStatus();
      Swal.fire({
        icon: "error",
        text: "Data yang anda masukkan salah",
        confirmButtonColor: "#FBBF24",
      });
    }
  };

  useEffect(() => {
    document.title = "Masuk LesinAja";
  }, []);

  if (roleOn == null) {
    return (
      <div className="flex flex-row justify-between items-start p-8 bg-yellow-300 h-screen">
        <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
        <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6 md:max-w-md">
          <Title
            title="Lesin Aja"
            subtitle="Ayo masuk ke akunmu untuk memulai menggunakan aplikasi LesinAja"
            type="cardItem"
          />
          <Button
            type="submit"
            text="Masuk Sebagai Admin"
            onClick={() => setRoleOn("admin")}
            additionalClassName="mb-4 mt-4 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
          <Button
            type="submit"
            text="Masuk Sebagai Tutor"
            onClick={() => setRoleOn("tutor")}
            additionalClassName="mb-4 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
          <Button
            type="submit"
            text="Masuk Sebagai Wali Murid"
            onClick={() => setRoleOn("walmur")}
            additionalClassName="mb-4 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </ContentContainer>
      </div>
    );
  } else if (roleOn == "admin") {
    return (
      <div className="flex flex-row justify-between items-start p-8 bg-yellow-300 h-screen">
        <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
        <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6 md:max-w-md">
          <p
            onClick={() => setRoleOn(null)}
            className="cursor-pointer text-yellow-500"
          >{`<- Kembali`}</p>
          <Title
            title="Masuk Sebagai Admin"
            subtitle="Ayo masuk ke akunmu untuk memonitoring aplikasi LesinAja"
            type="cardItem"
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputText
              label="Email"
              useHookRegister={register("email", {
                required: "Email harus diisi",
              })}
              placeholder="Contoh: handoko@gmail.com"
            />
            {errors.email && <FieldError message={errors.email.message} />}

            <InputPassword
              label="Kata Sandi"
              useHookRegister={register("password", {
                required: "Kata sandi harus diisi",
              })}
              placeholder="Masukkan kata sandi Anda"
            />
            {errors.password && (
              <FieldError message={errors.password.message} />
            )}

            <Button
              type="submit"
              text="Masuk"
              onClick={() => setFormStatus("refreshing")}
              loading={
                formStatus == "refreshing" && (
                  <LoadIcon additionalClassName="text-2xl" />
                )
              }
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
  } else if (roleOn == "tutor") {
    return (
      <div className="flex flex-row justify-between items-start p-8 bg-yellow-300 h-screen">
        <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
        <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6 md:max-w-md">
          <p
            onClick={() => setRoleOn(null)}
            className="cursor-pointer text-yellow-500"
          >{`<- Kembali`}</p>
          <Title
            title="Masuk Sebagai Tutor"
            subtitle="Ayo masuk ke akunmu untuk mulai belajar/mengajar di aplikasi LesinAja"
            type="cardItem"
          />
          <Button
            type="submit"
            text="Masuk dengan Google"
            onClick={handleLoginGoogle}
            loading={
              formStatus == "refreshing" && (
                <LoadIcon additionalClassName="text-2xl" />
              )
            }
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </ContentContainer>
      </div>
    );
  } else if (roleOn == "walmur") {
    return (
      <div className="flex flex-row justify-between items-start p-8 bg-yellow-300 h-screen">
        <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
        <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6 md:max-w-md">
          <p
            onClick={() => setRoleOn(null)}
            className="cursor-pointer text-yellow-500"
          >{`<- Kembali`}</p>
          <Title
            title="Masuk Sebagai Wali Murid"
            subtitle="Ayo masuk ke akunmu untuk mulai belajar/mengajar di aplikasi LesinAja"
            type="cardItem"
          />
          <Button
            type="submit"
            text="Masuk dengan Google"
            onClick={handleLoginGoogle}
            loading={
              formStatus == "refreshing" && (
                <LoadIcon additionalClassName="text-2xl" />
              )
            }
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
          />
        </ContentContainer>
      </div>
    );
  }
};
