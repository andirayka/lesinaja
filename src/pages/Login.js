import React, { useState } from "react";
import { ContentContainer, InputText, SectionTitle } from "@components";
import { logregLogo } from "@assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row">
      <img src={logregLogo} alt="" />
      <ContentContainer>
        <SectionTitle
          heading="Masuk"
          body="Ayo masuk ke akunmu untuk mulai belajar/mengajar"
        />
        <InputText label="Email" value={email} onChange={setEmail} />
      </ContentContainer>
    </div>
  );
};

export default Login;
