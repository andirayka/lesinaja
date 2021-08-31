import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  SkeletonLoading,
} from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

export const ListWalmur = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce(`user`);
    setData(getData);
    setLoading(false);
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow">
        <Title
          title="Wali Murid Lesin Aja"
          subtitle="Daftar / Wali Murid Lesin Aja"
          type="pageTitle"
        />
        <CardItem title="Loading..." containerClass="mt-8 shadow-lg">
          <SkeletonLoading fullWidthLineCount={6} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="flex-grow">
        <Title
          title="Wali Murid Lesin Aja"
          subtitle="Daftar / Wali Murid Lesin Aja"
          type="pageTitle"
        />

        {Object.entries<any>(data)
          .reverse()
          .map((item, index) => {
            const [key, value] = item;
            if (value.roles && value.roles.wali_murid && value.kontak) {
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
                        pathname: "/form-walimurid",
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
