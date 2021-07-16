import React from 'react';
import {
  ContentContainer,
  InputText,
  InputPassword,
  SectionTitle,
  Button,
} from '@components';
import { logregLogo } from '@assets';
import { useForm } from 'react-hook-form';

const Login = () => {
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
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" />
      <ContentContainer>
        <SectionTitle
          heading="Masuk"
          body="Ayo masuk ke akunmu untuk mulai belajar/mengajar"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            label="Email"
            useHookRegister={register('email', {
              required: 'Email harus diisi',
            })}
            placeholder="Contoh: handoko@gmail.com"
          />
          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
          <InputPassword
            label="Kata Sandi"
            useHookRegister={register('password', {
              required: 'Kata sandi harus diisi',
            })}
            placeholder="Masukkan kata sandi Anda"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
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

export default Login;
