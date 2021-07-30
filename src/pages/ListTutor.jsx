import React from "react";
import { Title, CardItem, CardKeyValue, Button } from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const ListTutor = () => {
  const getDataOm = () => {
    getFirebaseDataOnce({ ref });
    console.log(getFirebaseDataOnce);
  };

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Tutor Lesin Aja" type="pageTitle" />

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
            <button onClick={getDataOm}>Percobaan</button>
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
