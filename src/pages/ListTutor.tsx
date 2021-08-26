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
import { databaseRef, getFirebaseDataOnce } from "@utils";

export const ListTutor = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [data, setData] = useState<undefined | object>(undefined);

  const [queryInput, setQueryInput] = useState<string>("");

  const [filterInput, setFilterInput] = useState<string | undefined>(undefined);

  const getDataFirebase = async (
    filterType: string,
    filterData: string | boolean
  ) => {
    try {
      const tutorQuery = await databaseRef("user")
        .orderByChild(filterType)
        .equalTo(filterData)
        .once("value", (snapshot) => snapshot);

      setData(tutorQuery.val());
      setLoading(false);
    } catch (message) {
      console.error(message);
    }
  };

  const getSearchResult = async (keyword: string) => {
    try {
      const tutorQuery = await databaseRef("user")
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
    if (filterInput) {
      getDataFirebase("kontak/id_desa", "3515110005");
    } else {
      getDataFirebase("roles/tutor", true);
    }
    console.log(data);
  }, [queryInput, filterInput]);

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
          onClick={() => getSearchResult(queryInput)}
          filterData={(o) => setFilterInput(o)}
          clearFilterInput={{}}
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
