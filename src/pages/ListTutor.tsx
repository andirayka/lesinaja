import React, { Children, useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  SkeletonLoading,
  InputText,
  InputSelect,
} from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce, databaseRef } from "@utils";

export const ListTutor = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(undefined);

  const [query, setQuery] = useState(undefined);

  const [queryInput, setQueryInput] = useState("");

  const getDataFirebase = async () => {
    try {
      const tutorQuery = await databaseRef("user")
        .orderByChild("roles/tutor")
        .equalTo(true)
        .once("value", (snapshot) => snapshot);

      setData(tutorQuery.val());
      setLoading(false);
    } catch (message) {
      console.error(message);
    }
  };

  const searchData = async (keyword: string) => {
    try {
      const tutorQuery = await databaseRef(`user`)
        .orderByChild("nama")
        .startAt(`${keyword}`)
        .endAt(`${keyword}\uf8ff`)
        .once("value", (snapshot) => snapshot);

      setQuery(tutorQuery.val());
      setData(tutorQuery.val());
    } catch (message) {
      console.error(message);
    }
  };

  useEffect(() => {
    getDataFirebase();
  }, [queryInput]);

  if (loading && !data) {
    return (
      <div className="flex-grow">
        <Title
          title="Tutor Lesin Aja"
          subtitle="Daftar / Tutor Lesin Aja"
          type="pageTitle"
        />
        <CardItem title="Loading..." containerClass="mt-8">
          <SkeletonLoading fullWidthLineCount={6} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="flex-grow">
        <Title
          title="Tutor Lesin Aja"
          subtitle="Daftar / Tutor Lesin Aja"
          type="pageTitle"
        />
        {/* form filter */}
        <div className="bg-white mt-8 rounded-md shadow-lg">
          <div className="flex flex-row items-center">
            <InputText
              value={queryInput}
              placeholder="Cari data berdasarkan nama..."
              containerClassName="p-2 flex-1"
              onChange={(e) => setQueryInput(e.target.value)}
            />
            <Button
              text="Cari"
              additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg mr-2 py-[0.5em]"
              onClick={() => {
                searchData(`${queryInput}`);
              }}
            />
          </div>
          <InputSelect
            data={""}
            heading="Filter berdasarkan wilayah"
            prompt="Pilih provinsi.."
            containerClassName="cursor-pointer p-2"
            itemClassName="w-full"
          />
        </div>
        {data &&
          Object.entries<any>(data).map(([key, value], index) => {
            if (value.roles.tutor) {
              return (
                <CardItem
                  key={index}
                  title={value.nama}
                  containerClass="mt-8 shadow-lg"
                >
                  <CardKeyValue keyName="Email" value={value.email} />
                  {value.kontak && (
                    <>
                      <CardKeyValue
                        keyName="No. WA"
                        value={value.kontak.telepon}
                      />
                      <CardKeyValue
                        keyName="Alamat"
                        value={value.kontak.alamat_rumah}
                      />
                    </>
                  )}
                  <div className="flex-row mt-8">
                    <Link
                      to={{
                        pathname: "/form-tutor",
                        state: {
                          id: key,
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
            }
          })}
      </div>
    );
  }
};
