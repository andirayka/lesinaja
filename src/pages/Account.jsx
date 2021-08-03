import React, { useEffect, useState } from "react";
import {
  ContentContainer,
  InputText,
  SectionTitle,
  Button,
  FieldError,
} from "@components";
import { firebase } from "@utils";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Account = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  useEffect(() => {
    // Menunggu firebase login
    const user = firebase.auth().currentUser;
    if (user) {
      var uid = user.uid;
      console.log(uid);
    } else {
      history.push("/masuk");
    }

    return () => {};
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ContentContainer additionalClassName="w-full flex-grow bg-white rounded-lg p-6 md:ml-8">
      {/* Nama */}
      <SectionTitle heading="Akun Administrator" />
      <form onSubmit={handleSubmit(onSubmit)} name="validation">
        <InputText
          label="Nama"
          useHookRegister={register("name", {
            required: "Nama tidak boleh kosong",
          })}
          placeholder="Contoh: Admin Abdullah"
        />
        {errors.name && <FieldError message={errors.name.message} />}

        <Button
          type="submit"
          // onClick={() => alert("berhasil simpan nama")}
          text="Simpan"
          additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 font-medium w-full rounded-full"
        />
      </form>
    </ContentContainer>
  );
};

export default Account;
