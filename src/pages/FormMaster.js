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

  return (
    <div className="w-full flex-grow ml-8">
      <Title text={`Daftar ${prevData?.title}`} type="pageTitle" />
      <Button
        text={`Tambah ${prevData?.title}`}
        additionalClassName="bg-yellow-500 rounded-lg font-medium mt-4"
        onClick={() => {}}
      />

      <CardFormMaster
        containerClass="mt-8"
        data={formData}
        onDelete={(item) => {
          setFormData((prev) => prev.filter((o) => o.id != item.id));
        }}
      />
    </div>
  );
};

export default FormMaster;
