import React, { useEffect, useContext, useState } from "react";
import {
  Title,
  Button,
  CardFormMaster,
  RefreshIcon,
  Skeleton,
} from "@components";
import { ContextMaster } from "@context";
import { useLocation } from "react-router-dom";

const FormMaster = () => {
  const { state: prevData } = useLocation();
  const {
    state: { formData, formStatus },
    getFormData,
    setFormName,
  } = useContext(ContextMaster);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setFormName(prevData.refName);
    getFormData(prevData.refName);
  }, [prevData]);

  const renderForm = () => {
    return (
      <>
        {/* Add Button */}
        {formStatus == "loading" ? (
          <Skeleton
            mainCount={[1]}
            elementClassName="h-10 w-52"
            containerClassName="mt-4"
          />
        ) : (
          <Button
            text={`Tambah ${prevData?.title}`}
            additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mt-4"
            onClick={() => {
              setIsAdding(true);
            }}
          />
        )}

        {/* Form */}
        <div className="relative">
          {/* Refresh Icon */}
          {formStatus == "refreshing" && <RefreshIcon />}

          {/* List & Form Master */}
          <CardFormMaster
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            formStatus={formStatus}
            containerClass="mt-8"
            data={formData}
          />
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text={`Daftar ${prevData?.title}`} type="pageTitle" />

      {renderForm()}
    </div>
  );
};

export default FormMaster;
