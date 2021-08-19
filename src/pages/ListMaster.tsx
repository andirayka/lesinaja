import React, { useContext, useEffect } from "react";
import {
  Title,
  CardItem,
  Button,
  SkeletonLoading,
  EmptyIcon,
} from "@components";
import { Link } from "react-router-dom";
import { MasterContext } from "@context";
import { DBKEY } from "@utils";

export const ListMaster = () => {
  const {
    state: { listData, listStatus },
    getListData,
    setFormStatus,
  } = useContext(MasterContext);

  useEffect(() => {
    getListData();
    // console.log(listData);
  }, []);

  const CardContent = (type: string) => {
    if (listStatus == "loading") {
      return <SkeletonLoading fullWidthLineCount={5} halfWidthLineCount={2} />;
    }

    // Jika ada isinya
    if (listData[type]) {
      if (type == "paket") {
        return Object.values(listData["paket"]).map(
          (item: any, index: number) => {
            return (
              <p
                key={index}
              >{`${item.nama} (${item.jumlah_pertemuan} pertemuan)`}</p>
            );
          }
        );
      }

      return Object.values(listData[type]).map((item: any, index: number) => {
        return <p key={index}>{item.nama}</p>;
      });
    }

    // Jika kosong
    return <EmptyIcon />;
  };

  return (
    <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
      <Title
        title="Master Aplikasi"
        subtitle="Daftar / Data Master Aplikasi"
        type="pageTitle"
      />
      {/* Row 1 */}
      <div className="flex">
        {/* Jenjang Kelas */}
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          <>
            {CardContent("jenjangkelas")}

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: {
                      title: "Jenjang Kelas",
                      ref: DBKEY.masterJenjangKelas,
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
            {CardContent("mapel")}

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Mapel", ref: DBKEY.masterMapel },
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
            {CardContent("paket")}

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Paket", ref: DBKEY.masterPaket },
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
            {CardContent("wilayah")}

            {listStatus == "viewing" && (
              <div className="flex-row mt-8">
                <Link
                  to={{
                    pathname: "/form-master",
                    state: { title: "Wilayah", ref: DBKEY.masterWilayah },
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
