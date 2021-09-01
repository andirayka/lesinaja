import React, { useEffect, useState, useContext } from "react";
import {
  Title,
  CardItem,
  Button,
  SkeletonLoading,
  CardKeyValue,
  EmptyIcon,
  Swal,
  LoadIcon,
} from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";
import { MasterContext } from "@context";

export const ListCourse = () => {
  const [courseData, setCourseData] = useState<object | undefined>(undefined);
  const [masterData, setMasterData] = useState<any | undefined>(undefined);
  const [status, setStatus] = useState<string>("loading");

  const { setFormName, deleteFormData } = useContext(MasterContext);

  const getCourseData = async () => {
    const courses = await getFirebaseDataOnce("master_les");
    setCourseData(courses);

    if (courses) {
      const arrCourses = await Promise.all(
        Object.entries(courses).map(async ([key, value]: any) => {
          const finalValue = {
            ...value,
            jenjangkelas: await getFirebaseDataOnce(
              `master_jenjangkelas/${value.jenjangkelas}/nama`
            ),
            jenjangkelasKey: value.jenjangkelas,

            mapel: await getFirebaseDataOnce(
              `master_mapel/${value.mapel}/nama`
            ),
            mapelKey: value.mapel,

            paket: await getFirebaseDataOnce(
              `master_paket/${value.paket}/nama`
            ),
            paketKey: value.paket,

            wilayah: await getFirebaseDataOnce(
              `master_wilayah/${value.wilayah}/nama`
            ),
            wilayahKey: value.wilayah,
          };

          return [key, finalValue];
        })
      );
      setStatus("viewing");
      setMasterData(arrCourses);
    } else if (courses === null) {
      setStatus("");
    }
  };

  useEffect(() => {
    setFormName("master_les");

    getCourseData();
  }, []);

  // tampilan saat berhasil query data
  if (courseData && status == "viewing") {
    return (
      <div className="flex-grow">
        <Title
          title="Pilihan Les"
          subtitle="Daftar / Pilihan Les"
          type="pageTitle"
        />
        <Link
          // button tambah mengirim state not updating
          to={{
            pathname: "/tambah-pilihanles",
            state: {
              isUpdating: false,
              prevValue: undefined,
              prevKey: undefined,
            },
          }}
        >
          <Button
            text="Tambah Pilihan Les"
            additionalClassName="bg-yellow-400 hover:bg-white hover:shadow-lg rounded-lg font-medium mt-4"
            onClick={() => {}}
          />
        </Link>
        {masterData &&
          masterData.map(([key, value]: any) => {
            return (
              <CardItem
                key={key}
                title={`${value.mapel} ${value.jenjangkelas}`}
                containerClass="mt-8 bg-white rounded-lg shadow-lg"
              >
                <CardKeyValue keyName="Paket" value={value.paket} />
                <CardKeyValue keyName="Wilayah" value={value.wilayah} />
                <CardKeyValue keyName="Biaya" value={value.biaya} />
                <div className="flex flex-row mt-8 justify-end">
                  <Link
                    // button edit mengirim state updating
                    to={{
                      pathname: "/beranda",
                      state: {
                        isUpdating: true,
                        prevValue: {
                          mapel: value.mapelKey,
                          jenjangkelas: value.jenjangkelasKey,
                          paket: value.paketKey,
                          wilayah: value.wilayahKey,
                          biaya: value.biaya,
                          gaji_tutor: value.gaji_tutor,
                        },
                        prevKey: key,
                      },
                    }}
                  >
                    <Button
                      text="Ubah Pilihan Les"
                      additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium mr-4"
                      onClick={() => {}}
                    />
                  </Link>
                  <Button
                    text="Hapus Pilihan Les"
                    additionalClassName="bg-yellow-600 hover:bg-red-500 rounded-lg font-medium self-end"
                    onClick={() => {
                      Swal.fire({
                        text: `Apakah Anda yakin akan menghapus data les ${value.mapel}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#FBBF24",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Hapus",
                        cancelButtonText: "Batal",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          setStatus("refreshing");
                          getCourseData();
                          deleteFormData(key);
                        }
                      });
                    }}
                  />
                </div>
              </CardItem>
            );
          })}
      </div>
    );
  }

  if (status == "loading") {
    return (
      <div className="flex-grow">
        <Title
          title="Pilihan Les"
          subtitle="Daftar / Pilihan Les"
          type="pageTitle"
        />
        <CardItem
          title="Loading..."
          containerClass="mt-8 bg-white rounded-lg shadow-lg"
        >
          <SkeletonLoading fullWidthLineCount={6} />
        </CardItem>
      </div>
    );
  }

  // tampilan saat data kosng
  return (
    <div className="w-full flex-grow md:ml-8">
      <Title
        title="Pilihan Les"
        subtitle="Daftar / Pilihan Les"
        type="pageTitle"
      />
      <Link
        to={{
          pathname: "/tambah-pilihanles",
          state: {
            isUpdating: false,
            prevValue: undefined,
            prevKey: undefined,
          },
        }}
      >
        <Button
          text="Tambah Pilihan Les"
          additionalClassName="bg-yellow-400 hover:bg-white hover:shadow-lg rounded-lg font-medium mt-4"
          onClick={() => {}}
        />
      </Link>
      <CardItem
        title={status == "refreshing" ? "Loading" : "Tidak ada data les"}
        containerClass="mt-8"
      >
        {status == "refreshing" ? (
          <SkeletonLoading fullWidthLineCount={6} />
        ) : (
          <EmptyIcon />
        )}
      </CardItem>
    </div>
  );
};
