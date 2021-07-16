import React from 'react';
import { ContentContainer, SectionTitle } from '@components';
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
      </ContentContainer>
    </div>
  );
};

export default Login;
