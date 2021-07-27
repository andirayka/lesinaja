import React, { useState, useEffect } from "react";
import { Title, CardItem, Button, Skeleton } from "@components";
import { Link } from "react-router-dom";
import { getFirebaseMasterData } from "@utils";

const ListMaster = () => {
  const [listMaster, setListMaster] = useState({});

  useEffect(() => {
    const fbParams = {
      jenjangKelasParams: {
        ref: "master_jenjangkelas",
        onGetData: (data) => {
          const jenjangKelasData = Object.values(data);
          setListMaster({
            jenjangKelas: jenjangKelasData,
          });
        },
      },
      mapelParams: {
        ref: "master_mapel",
        onGetData: (data) => {
          const mapelKelasData = Object.values(data);
          setListMaster((prev) => ({
            ...prev,
            mapel: mapelKelasData,
          }));
        },
      },
      paketParams: {
        ref: "master_paket",
        onGetData: (data) => {
          const paketData = Object.values(data);
          setListMaster((prev) => ({
            ...prev,
            paket: paketData,
          }));
        },
      },
      wilayahParams: {
        ref: "master_wilayah",
        onGetData: (data) => {
          const wilayahData = Object.values(data);
          setListMaster((prev) => ({
            ...prev,
            wilayah: wilayahData,
          }));
        },
      },
    };
    getFirebaseMasterData(fbParams.jenjangKelasParams);
    getFirebaseMasterData(fbParams.mapelParams);
    getFirebaseMasterData(fbParams.paketParams);
    getFirebaseMasterData(fbParams.wilayahParams);
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      {/* Row 1 */}
      {/* jenjangKelas */}
      <div className="flex">
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          {listMaster.jenjangKelas ? (
            <>
              {listMaster.jenjangKelas.map((item, index) => {
                return <p key={index}>{item.nama}</p>;
              })}
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Jenjang Kelas" },
                  }}
                >
                  <Button
                    text="Lihat Lebih Banyak"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {}}
                  />
                </Link>
              </div>
            </>
          ) : (
            <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
          )}
        </CardItem>

        {/* mapel */}
        <div className="mx-5"></div>
        <CardItem title="Mapel" containerClass="mt-8 flex-1">
          {listMaster.jenjangKelas ? (
            <>
              {listMaster.jenjangKelas.map((item, index) => {
                return <p key={index}>{item.nama}</p>;
              })}
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Jenjang Kelas" },
                  }}
                >
                  <Button
                    text="Lihat Lebih Banyak"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {}}
                  />
                </Link>
              </div>
            </>
          ) : (
            <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
          )}
        </CardItem>
      </div>

      {/* Row 2 */}
      {/* paket */}
      <div className="flex">
        <CardItem title="Paket" containerClass="mt-8 flex-1">
          {listMaster.jenjangKelas ? (
            <>
              {listMaster.jenjangKelas.map((item, index) => {
                return <p key={index}>{item.nama}</p>;
              })}
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Jenjang Kelas" },
                  }}
                >
                  <Button
                    text="Lihat Lebih Banyak"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {}}
                  />
                </Link>
              </div>
            </>
          ) : (
            <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
          )}
        </CardItem>

        {/* wilayah */}
        <div className="mx-5"></div>
        <CardItem title="Wilayah" containerClass="mt-8 flex-1">
          {listMaster.jenjangKelas ? (
            <>
              {listMaster.jenjangKelas.map((item, index) => {
                return <p key={index}>{item.nama}</p>;
              })}
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Jenjang Kelas" },
                  }}
                >
                  <Button
                    text="Lihat Lebih Banyak"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {}}
                  />
                </Link>
              </div>
            </>
          ) : (
            <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
          )}
        </CardItem>
      </div>
    </div>
  );
};

export default ListMaster;
