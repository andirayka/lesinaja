import React from "react";
import { ContentContainer, SectionTitle } from "@components";

const Login = () => {
  return (
    <div className="flex flex-row">
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
