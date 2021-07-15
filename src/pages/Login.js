import React from "react";
import { InputText, Contoh } from "@components";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>

      <InputText />

      <Contoh bgColor="red" />
      <Contoh bgColor="yellow" button={<button>sebuah button</button>} />
      <Contoh bgColor="blue" />
    </div>
  );
};

export default Login;
