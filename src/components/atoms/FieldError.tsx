import React, { useEffect, useContext, FC } from "react";
import { MasterContext } from "@context";

type Props = {
  message?: any;
};
// * Untuk message di bawah field jika ada error
export const FieldError: FC<Props> = ({ message }) => {
  const {
    state: { formStatus },
    setFormStatus,
  } = useContext(MasterContext);

  useEffect(() => {
    setFormStatus();
  }, []);
  return <p className="text-red-500">{message}</p>;
};
