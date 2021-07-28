import React, { useEffect, useContext } from "react";
import { Title, Button, CardFormMaster, Skeleton } from "@components";
import { ContextMaster } from "@context";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

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
    if (formStatus == "loading") {
      return <p className="text-7xl text-red-700">ANIMASI LOADING</p>;
    }

    return (
      <>
        <Button
          text={`Tambah ${prevData?.title}`}
          additionalClassName="bg-yellow-400 hover:bg-white rounded-lg font-medium mt-4"
          onClick={() => {
            setFormStatus("adding");
          }}
        />

        {/* Sementara */}
        {formStatus == "refreshing" && (
          <div>
            <FontAwesomeIcon
              icon={faSyncAlt}
              className="text-2xl text-green-700 mt-7"
              spin
            />
          </div>
        )}
        <CardFormMaster
          formStatus={formStatus}
          containerClass="mt-8"
          data={formData}
        />
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
