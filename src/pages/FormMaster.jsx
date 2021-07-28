import React, { useEffect, useContext } from "react";
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
    setFormStatus,
  } = useContext(ContextMaster);

  useEffect(() => {
    getFormData();
  }, []);

  const renderForm = () => {
    return (
      <>
        <Button
          text={`Tambah ${prevData?.title}`}
          additionalClassName={
            formStatus == "loading"
              ? "bg-gray-400 hover:bg-white rounded-lg font-medium mt-4"
              : "bg-yellow-400 hover:bg-white rounded-lg font-medium mt-4"
          }
          onClick={() => {
            setFormStatus("adding");
          }}
        />
        <div className="relative spa">
          {formStatus == "refreshing" && <RefreshIcon />}
          {formStatus == "loading" ? (
            <CardFormMaster formStatus={formStatus} containerClass="mt-8">
              <Skeleton
                mainCount={[1, 2, 3, 4, 5, 6]}
                containerClassName="space-y-3 px-4 py-2"
              />
            </CardFormMaster>
          ) : (
            <CardFormMaster
              formStatus={formStatus}
              containerClass="mt-8"
              data={formData}
            />
          )}
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
