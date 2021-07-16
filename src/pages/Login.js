import React, { useState } from "react";
import { ContentContainer, InputText, SectionTitle, Button } from "@components";
import { logregLogo } from "@assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row justify-between items-start p-8">
      <img src={logregLogo} className="hidden md:block m-10 w-2/4" al="" />
      <ContentContainer>
        <SectionTitle
          heading="Masuk"
          body="Ayo masuk ke akunmu untuk mulai belajar/mengajar"
        />
        <InputText label="Email" value={email} onChange={setEmail} />
        <Button
          text="Masuk"
          additionalClassName="mt-8 bg-yellow-400 hover:bg-yellow-600 text-white w-full rounded-full"
        />
      </ContentContainer>
    </div>
  );
};

export default Login;
