import React, { useContext, useEffect } from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
  LoadIcon,
  Swal,
  FieldError,
} from "@components";
import { logregLogo } from "@assets";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { handleLogin } from "@utils";
import { Link } from "react-router-dom";
import { ContextAuth, ContextMaster } from "@context";

const Login = () => {
  const { setIsLoggedIn } = useContext(ContextAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(ContextMaster);

  const onSubmit = async (data) => {
    const { success, role } = await handleLogin(data.email, data.password);

    // console.log(role);
    if (success) {
      setIsLoggedIn(true);
      if (role && role.admin) {
        history.push("/beranda");
      } else if (role && role.tutor) {
        alert("Berhasil login sebagai tutor");
      } else if (role && role.walimurid) {
        alert("Berhasil login sebagai wali murid");
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

    // console.log(data);
    // console.log(errors);
    // history.push("/beranda");
  };

  useEffect(() => {
    document.title = "Masuk LesinAja";
  }, []);

  return (
    <div className="flex flex-row justify-between items-start p-8 bg-yellow-300 h-screen">
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
          {errors.email && <FieldError message={errors.email.message} />}

          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("password", {
              required: "Kata sandi harus diisi",
            })}
            placeholder="Masukkan kata sandi Anda"
          />
          {errors.password && <FieldError message={errors.password.message} />}

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
          {/* <input
            type="button"
            value="Percobaan Om"
            className="bg-blue-300 hover:bg-blue-500"
          /> */}
        </form>
      </ContentContainer>
    </div>
  );
};

export default Login;
