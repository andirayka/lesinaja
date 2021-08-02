import React, { useContext, useEffect } from "react";
import { Title, CardItem, Button, Skeleton, EmptyIcon } from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";

const ListMaster = () => {
  const {
    state: { listData, listStatus },
    getListData,
    setFormStatus,
    setFormName,
  } = useContext(ContextMaster);

  useEffect(() => {
    getListData();
  }, []);

  const CardContent = ({ type }) => {
    if (listStatus == "loading") {
      return <Skeleton mainCount={[1, 2, 3]} subCount={[1, 2]} />;
    }

    // Jika ada isinya
    if (listData[type]) {
      if (type == "paket") {
        return Object.values(listData["paket"]).map((item, index) => {
          return (
            <p
              key={index}
            >{`${item.nama} (${item.jumlah_pertemuan} pertemuan)`}</p>
          );
        });
      }

      return Object.values(listData[type]).map((item, index) => {
        return <p key={index}>{item.nama}</p>;
      });
    }

    // Jika kosong
    return <EmptyIcon />;
  };

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />
      {/* Row 1 */}
      <div className="flex">
        {/* Jenjang Kelas */}
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          <>
            <CardContent type="jenjangkelas" />
            <div className="flex-row mt-8">
              <Link
                to={{
                  pathname: "/form-master",
                  state: {
                    title: "Jenjang Kelas",
                    refName: "master_jenjangkelas",
                  },
                }}
              >
                <Button
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {
                    setFormStatus("loading");
                    setFormName("master_jenjangkelas");
                  }}
                />
              </Link>
            </div>
          </>
        </CardItem>

        {/* mapel */}
        <div className="mx-5"></div>

        <CardItem title="Mapel" containerClass="mt-8 flex-1">
          <>
            <CardContent type="mapel" />

            <div className="flex-row mt-8">
              <Link
                to={{
                  pathname: "/form-master",
                  state: { title: "Mapel", refName: "master_mapel" },
                }}
              >
                <Button
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {
                    setFormStatus("loading");
                    setFormName("master_mapel");
                  }}
                />
              </Link>
            </div>
          </>
        </CardItem>
      </div>

      {/* Row 2 */}
      <div className="flex">
        {/* paket */}
        <CardItem title="Paket" containerClass="mt-8 flex-1">
          <>
            <CardContent type="paket" />

            <div className="flex-row mt-8">
              <Link
                to={{
                  pathname: "/form-master",
                  state: { title: "Paket", refName: "master_paket" },
                }}
              >
                <Button
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {
                    setFormStatus("loading");
                    setFormName("master_paket");
                  }}
                />
              </Link>
            </div>
          </>
        </CardItem>

        <div className="mx-5"></div>

        {/* wilayah */}
        <CardItem title="Wilayah" containerClass="mt-8 flex-1">
          <>
            <CardContent type="wilayah" />

            <div className="flex-row mt-8">
              <Link
                to={{
                  pathname: "/form-master",
                  state: { title: "Wilayah", refName: "master_wilayah" },
                }}
              >
                <Button
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {
                    setFormStatus("loading");
                    setFormName("master_wilayah");
                  }}
                />
              </Link>
            </div>
          </>
        </CardItem>
      </div>
    </div>
  );
};

export default ListMaster;
