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

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" al="" />
      <ContentContainer>
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

          <InputRadio heading="Saya Adalah" label="Tutor/Pengajar" />
          <InputRadio label="Wali Murid" />
          <Button
            type="submit"
            text="Daftar"
            additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
          />
        </form>
      </ContentContainer>
    </div>
  );
};

export default Register;
