import React from 'react';
import {
  ContentContainer,
  InputText,
  InputRadio,
  InputPassword,
  SectionTitle,
  Button,
} from '@components';
import { logregLogo } from '@assets';
import { useForm } from 'react-hook-form';
import { handleRegister } from "@utils";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleRegister(data.email, data.password);
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" al="" />
      <ContentContainer additionalClassName="flex-grow md:flex-grow-0 bg-white rounded-lg p-6">
        <SectionTitle
          heading="Daftar Pengguna Baru"
          body="Daftarkan dirimu dan nikmati pengalaman belajar/mengajar yang asyik"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Nama"
            useHookRegister={register('name', {
              required: 'Nama harus diisi',
            })}
            placeholder="Contoh: Handoko Wahyudi"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <InputText
            label="Email"
            useHookRegister={register('email', {
              required: 'Email harus diisi',
            })}
            placeholder="Contoh: handoko@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <InputPassword
            label="Kata Sandi"
            useHookRegister={register('password', {
              required: 'Kata sandi harus diisi',
            })}
            placeholder="Masukkan kata sandi Anda"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <InputPassword
            label="Ulangi Kata Sandi"
            useHookRegister={register('repeatPassword', {
              required: 'Kata sandi tidak sama dengan kata sandi sebelumnya',
            })}
            placeholder="Masukkan ulang kata sandi Anda"
          />

          <InputRadio heading="Saya adalah" />
          {[
            { id: 1, role: 'Tutor/Pengajar', radioItem: 'Tutor/Pengajar' },
            { id: 2, role: 'Wali Murid', radioItem: 'Wali Murid' },
          ].map(({ id, radioItem, role }) => {
            return <InputRadio key={id} id={radioItem} label={role} />;
          })}
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
