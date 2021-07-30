import React, { useContext } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  Skeleton,
  CardFormMaster,
} from "@components";
import { ContextMaster } from "@context";
import { Link } from "react-router-dom";

const ListTutor = () => {
  const {
    state: { formData, formStatus },
  } = useContext(ContextMaster);

  const renderForm = () => {
    return (
      <>
        <div className="relative">
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
      <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />

      {renderForm()}

      {[1, 1, 1, 1, 1, 1].map((item, key) => {
        return (
          <CardItem key={key} title="Abdul Majid, S.Kom." containerClass="mt-8">
            <CardKeyValue keyName="Email" value="handoko@gmail.com" />
            <CardKeyValue keyName="No. WA" value="089912345678" />
            <CardKeyValue
              keyName="Alamat"
              value="Perum Graha Kuncara Blok H No.29 Kemiri , Sidoarjo, Jawa Timur, Kemiri, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61234"
            />
            <CardKeyValue keyName="Mata Pelajaran" value="Matematika" />
            <div className="flex-row mt-8">
              <Link
                to={{
                  pathname: "/form-tutor",
                  state: {
                    name: "Abdul Majid, S.Kom.",
                    email: "handoko@gmail.com",
                    nomor: "089912345678",
                  },
                }}
              >
                <Button
                  text="Lihat Detail"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {}}
                />
              </Link>
            </div>
          </CardItem>
        );
      })}
    </div>
  );
};

export default ListTutor;
