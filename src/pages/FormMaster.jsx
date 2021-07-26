import React, { useState, useEffect, useContext } from "react";
import { Title, Button, CardFormMaster } from "@components";
import { ContextMaster } from "@context";
import { useLocation } from "react-router-dom";

const FormMaster = () => {
  const { state: prevData } = useLocation();
  const {
    state: { formData, formStatus },
    getFormData,
  } = useContext(ContextMaster);

  useEffect(() => {
    getFormData();
  }, []);

  const renderForm = () => {
    if (["viewing", "adding", "editing"].includes(formStatus) && formData) {
      return (
        <>
          <Button
            text={`Tambah ${prevData?.title}`}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mt-4"
            onClick={() => {
              // setFormStatus("adding");
            }}
          />
          <CardFormMaster
            formStatus={formStatus}
            containerClass="mt-8"
            data={formData}
            onAdd={(item) => {
              // setFormData((prev) => [...prev, ...item]);
            }}
            onDelete={(item) => {
              // setFormData((prev) => prev.filter((o) => o.nama != item.nama));
            }}
            onCancelEditing={() => {
              // setFormStatus("viewing");
            }}
          />
        </>
      );
    }
    if (formStatus == "empty") {
      return <p className="text-7xl text-red-700">HALAMAN KOSONG</p>;
    }

    return <p className="text-7xl text-red-700">ANIMASI LOADING</p>;
  };

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text={`Daftar ${prevData?.title}`} type="pageTitle" />

      {renderForm()}
    </div>
  );
};

export default FormMaster;
