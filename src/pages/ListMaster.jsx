import React, { useState, useEffect } from "react";
import { Title, CardItem, Button } from "@components";
import { Link } from "react-router-dom";
import firebase from "@utils";

const ListMaster = () => {
  const [jenjangKelas, setJenjangKelas] = useState();

  useEffect(() => {
    const jenjangKelasRef = firebase.database().ref("master_jenjangkelas");

    jenjangKelasRef.on("value", (snapshot) => {
      const jenjangKelas = [];
      snapshot.forEach((item) => {
        const rawData = item.val();
        const keyData = item.key;
        jenjangKelas.push({ keyData, ...rawData });
      });

      setJenjangKelas(jenjangKelas);
    });
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      {/* Row 1 */}
      {/* jenjangKelas */}
      <div className="flex">
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          {jenjangKelas ? (
            jenjangKelas.map((data, index) => {
              return <p key={index}>{data.nama}</p>;
            })
          ) : (
            <p>Loading...</p>
          )}
          <div className="flex-row mt-8">
            <Link
              to={{
                pathname: "/form-master",
                state: { title: "Jenjang Kelas", data: jenjangKelas },
              }}
            >
              <Button
                text="Lihat Lebih Banyak"
                additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                onClick={() => {}}
              />
            </Link>
          </div>
        </CardItem>
        <div className="mx-5"></div>
        <CardItem title="Mapel" containerClass="mt-8 flex-1">
          <p>Matematika</p>
          <p>Fisika</p>
          <p>Biologi</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
      </div>

      {/* Row 2 */}
      <div className="flex">
        <CardItem title="Paket" containerClass="mt-8 flex-1">
          <p>1 (4 pertemuan)</p>
          <p>2 (8 pertemuan)</p>
          <p>3 (12 pertemuan)</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
        <div className="mx-5"></div>
        <CardItem title="Wilayah" containerClass="mt-8 flex-1">
          <p>Jawa Timur</p>
          <p>Jawa Tengah</p>
          <p>Jawa Barat</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
      </div>
    </div>
  );
};

export default ListMaster;
