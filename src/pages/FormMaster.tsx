import React, { useEffect, useContext, useState } from "react";
import { Title, Button, CardFormMaster, SkeletonLoading } from "@components";
import { MasterContext } from "@context";
import { useLocation } from "react-router-dom";
import { clearConfigCache } from "prettier";

export const FormMaster = () => {
  const { state: prevData }: any = useLocation();
  const {
    state: { formData, formStatus, formName },
    getFormData,
    setFormName,
  } = useContext(MasterContext);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setFormName(prevData.ref);
    getFormData(prevData.ref);
  }, [prevData]);

  const renderForm = () => {
    return (
      <>
        {/* Add Button */}
        {formStatus == "loading" ? (
          <SkeletonLoading
            fullWidthLineCount={1}
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
          {/* {formStatus == "refreshing" && <RefreshIcon />} */}

          {/* Data Form Master */}
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
    <div className="flex-grow md:ml-8 md:mr-8">
      <Title
        title={prevData?.title}
        subtitle={`Daftar / ${prevData?.title}`}
        type="pageTitle"
      />

      {renderForm()}
    </div>
  );
};
