import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  SkeletonLoading,
  CardUserFilter,
} from "@components";
import { Link } from "react-router-dom";
import { databaseRef } from "@utils";

export const ListTutor = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(undefined);

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

        <CardUserFilter
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          onClick={() => searchData(queryInput)}
        />

        {data &&
          Object.entries<any>(data).map(([key, value], index) => {
            if (value.roles.tutor && value.kontak) {
              return (
                <CardItem
                  key={index}
                  title={value.nama}
                  containerClass="mt-8 shadow-lg"
                >
                  <CardKeyValue keyName="Email" value={value.email} />
                  <CardKeyValue keyName="No. WA" value={value.kontak.telepon} />
                  <CardKeyValue
                    keyName="Alamat"
                    value={value.kontak.alamat_rumah}
                  />

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
