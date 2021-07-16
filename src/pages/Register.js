import React, { useState } from 'react';
import {
  ContentContainer,
  InputText,
  SectionTitle,
  Button,
  InputRadio,
} from '@components';
import { logregLogo } from '@assets';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" al="" />
      <ContentContainer>
        <SectionTitle
          heading="Daftar Pengguna Baru"
          body="Daftarkan dirimu dan nikmati pengalaman belajar/mengajar yang asyik"
        />
        <InputText label="Email" value={email} onChange={setEmail} />
        <InputRadio
          heading="Saya Adalah"
          label="Tutor/Pengajar"
          value="Tutor/Pengajar"
        />
        <InputRadio label="Tutor/Pengajar" value="Tutor/Pengajar" />
        <Button
          text="daftar"
          additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
        />
      </ContentContainer>
    </div>
  );
};

export default Register;
