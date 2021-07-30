import React, { useEffect, useState } from "react";
import { Title, CardItem, CardKeyValue, Button } from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const ListTutor = () => {
  const [data, setData] = useState({});

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `user_role/tutor` });
    // console.log(getData);
    setData(getData);
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />
      {Object.entries(data).map((item, index) => {
        const [key, value] = item;
        // console.log(key);
        return (
          <CardItem key={index} title={value.nama} containerClass="mt-8">
            <CardKeyValue keyName="Email" value={value.email} />
            <CardKeyValue keyName="No. WA" value={value.nomor} />
            <CardKeyValue keyName="Alamat" value={value.alamat} />
            <CardKeyValue keyName="Mata Pelajaran" value={value.matkul} />
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
