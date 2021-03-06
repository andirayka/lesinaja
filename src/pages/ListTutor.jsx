import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  Skeleton,
  InputText,
  InputSelect,
} from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const ListTutor = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const [query, setQuery] = useState("");

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
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title
          title="Tutor Lesin Aja"
          text="Daftar Tutor Lesin Aja"
          type="pageTitle"
        />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
        <Title
          title="Tutor Lesin Aja"
          text="Daftar / Tutor Lesin Aja"
          type="pageTitle"
        />
        {/* form filter */}
        <div className="bg-white mt-8 rounded-md">
          <InputText
            value={query}
            placeholder="Cari data berdasarkan nama..."
            containerClassName="p-2"
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputSelect
            heading="Filter berdasarkan wilayah"
            prompt="Pilih provinsi.."
            containerClassName="cursor-pointer p-2"
            itemClassName="w-full"
          />
        </div>
        {Object.entries(data)
          .filter(([key, value]) => {
            // i artinya tidak case sensitive
            const matchKeyword = RegExp(query, "i");
            // return data yang sesuai dengan pencarian
            return matchKeyword.test(value.nama);
          })
          .map((item, index) => {
            const [key, value] = item;
            if (value.roles && value.roles.tutor && value.kontak) {
              return (
                <CardItem
                  key={index}
                  title={value.nama ? value.nama : "Data Nama Kosong"}
                  containerClass="mt-8"
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

export default ListTutor;
