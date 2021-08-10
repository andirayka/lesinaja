import React, { useEffect, useState } from "react";
import { Title, CardItem, CardKeyValue, Button, Skeleton } from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const ListTutor = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `user` });
    setData(getData);

    setLoading(false);
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex-grow md:ml-8">
        <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="w-full flex-grow md:ml-8">
        <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />

        {Object.entries(data).map((item, index) => {
          const [key, value] = item;
          if (value.roles && value.roles.tutor) {
            return (
              <CardItem
                key={index}
                title={
                  value.kontak.nama ? value.kontak.nama : "Data Nama Kosong"
                }
                containerClass="mt-8"
              >
                <CardKeyValue keyName="Email" value={value.kontak.email} />
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

export default ListTutor;
