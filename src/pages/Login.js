import React from 'react';
import { ContentContainer, SectionTitle, Button } from '@components';
import { logregLogo } from '@assets';

const Login = () => {
  return (
    <div className="flex flex-row">
      <img src={logregLogo} alt="" />
      <ContentContainer>
        <SectionTitle
          heading="Masuk"
          body="Ayo masuk ke akunmu untuk mulai belajar/mengajar"
        />
        <Button
          text="Masuk"
          bgColor="bg-yellow-400"
          hover="hover:bg-yellow-600"
          fontColor="text-white"
          width="100%"
          size="w-screen"
        />
      </ContentContainer>
    </div>
  );
};

export default Login;
