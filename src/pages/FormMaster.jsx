import React, { useState } from "react";
import { Title, Button, CardFormMaster } from "@components";
import { useLocation } from "react-router-dom";

const FormMaster = () => {
  const { state: prevData } = useLocation();
  const [formData, setFormData] = useState([
    { id: 1, name: "Matematika" },
    { id: 2, name: "Bahasa Inggris" },
    { id: 3, name: "IPA" },
  ]);
  const [formStatus, setFormStatus] = useState("viewing");

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
        onDelete={(item) => {
          setFormData((prev) => prev.filter((o) => o.id != item.id));
        }}
        onCancelEditing={() => {
          setFormStatus("viewing");
        }}
      />
    </div>
  );
};

export default FormMaster;
