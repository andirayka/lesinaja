import React, { useContext, useEffect } from "react";
import { Title, CardItem, Button, Skeleton, EmptyIcon } from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";
import { DBKEY } from "@utils";

const ListMaster = () => {
  const {
    state: { listData, listStatus },
    getListData,
    setFormStatus,
  } = useContext(ContextMaster);

  useEffect(() => {
    getListData();
  }, []);

  const CardContent = ({ type }) => {
    if (listStatus == "loading") {
      return <Skeleton mainCount={[1, 2, 3, 4, 5]} subCount={[1, 2]} />;
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
            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: {
                      title: "Jenjang Kelas",
                      refName: DBKEY.masterJenjangKelas,
                    },
                  }}
                >
                  <Button
                    text="Kelola"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {
                      setFormStatus("loading");
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        </CardItem>

        {/* mapel */}
        <div className="mx-5"></div>

        <CardItem title="Mapel" containerClass="mt-8 flex-1">
          <>
            <CardContent type="mapel" />

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Mapel", refName: DBKEY.masterMapel },
                  }}
                >
                  <Button
                    text="Kelola"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {
                      setFormStatus("loading");
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        </CardItem>
      </div>

      {/* Row 2 */}
      <div className="flex">
        {/* paket */}
        <CardItem title="Paket" containerClass="mt-8 flex-1">
          <>
            <CardContent type="paket" />

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Paket", refName: DBKEY.masterPaket },
                  }}
                >
                  <Button
                    text="Kelola"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {
                      setFormStatus("loading");
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        </CardItem>

        <div className="mx-5"></div>

        {/* wilayah */}
        <CardItem title="Wilayah" containerClass="mt-8 flex-1">
          <>
            <CardContent type="wilayah" />

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Wilayah", refName: DBKEY.masterWilayah },
                  }}
                >
                  <Button
                    text="Kelola"
                    additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                    onClick={() => {
                      setFormStatus("loading");
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        </CardItem>
      </div>
    </div>
  );
};

export default ListMaster;
