import React, { useState } from "react";
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
  Sidebar,
} from "@components";
import { useForm } from "react-hook-form";

const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="">
      <div className="">
        <Sidebar />
      </div>

      <ContentContainer className="">
        {/* Nama */}
        <SectionTitle heading="Akun Administrator" />
        <InputText
          label="Nama"
          useHookRegister={{
            value: name,
            onChange: (e) => setName(e.target.value),
          }}
          placeholder="Contoh: Admin Abdullah"
        />
        <Button
          onClick={() => alert("berhasil simpan nama")}
          text="Masuk"
          additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
        />

        {/* Password */}
        <SectionTitle heading="Ganti Kata Sandi" containerClass="mt-16" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("oldPassword", {
              required: "Kata sandi lama harus diisi",
            })}
            placeholder="Masukkan kata lama sandi Anda"
          />
          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("newPassword", {
              required: "Kata sandi baru harus diisi",
            })}
            placeholder="Masukkan kata sandi baru Anda"
          />
          <InputPassword
            label="Kata Sandi"
            useHookRegister={register("repeatPassword", {
              required: "Ulangi katasandi lama harus diisi",
            })}
            placeholder="Masukkan kembali kata sandi baru Anda"
          />
          <Button
            type="submit"
            text="Masuk"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
          />
        </form>
      </ContentContainer>
    </div>
  );
};

export default Account;
