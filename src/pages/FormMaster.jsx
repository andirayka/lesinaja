import React, { useState, useEffect } from "react";
import { Title, Button, CardFormMaster } from "@components";
import { getFirebaseData } from "@utils";
import { useLocation } from "react-router-dom";

const FormMaster = () => {
  const { state: prevData } = useLocation();
  const [formData, setFormData] = useState(null);
  const [formStatus, setFormStatus] = useState("loading");

  useEffect(() => {
    const fbParams = {
      ref: "master_jenjangkelas",
      onGetData: (data) => {
        if (data) {
          setFormData(data);
          setFormStatus("viewing");
        } else setFormStatus("empty");
      },
    };
    getFirebaseData(fbParams);
    return () => {};
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text={`Daftar ${prevData?.title}`} type="pageTitle" />
      <Button
        text={`Tambah ${prevData?.title}`}
        additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mt-4"
        onClick={() => {
          setFormStatus("adding");
        }}
      />

      <CardFormMaster
        formStatus={formStatus}
        containerClass="mt-8"
        data={formData}
        onAdd={(item) => {
          setFormData((prev) => [...prev, item]);
        }}
        onDelete={(item) => {
          setFormData((prev) => prev.filter((o) => o.name != item.name));
        }}
        onCancelEditing={() => {
          setFormStatus("viewing");
        }}
      />
    </div>
  );
};

export default FormMaster;
