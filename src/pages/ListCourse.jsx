import React, { useEffect, useState } from "react";
import {
  Title,
  CardItem,
  CardKeyValue,
  Button,
  EmptyIcon,
  Swal,
  Skeleton,
  RefreshIcon,
} from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce, getFirebaseDataByChild } from "@utils";

const ListCourse = () => {
  const [masterData, setMasterData] = useState({
    mapel: {
      nama_mapel: undefined,
    },
    paket: {
      nama_paket: undefined,
      jumlah_pertemuan: undefined,
    },
    wilayah: {
      nama_wilayah: undefined,
    },
  });

  const [loading, setLoading] = useState(true);

  const [courseData, setCourseData] = useState(undefined);

  const getCourseData = async () => {
    const courseQuery = await getFirebaseDataOnce({ ref: "master_les" });
    setCourseData(Object.values(courseQuery));
  };

  const getMasterData = async () => {
    const masterQuery = {
      mapel: await getFirebaseDataByChild({
        ref: "master_mapel",
        childKey: courseData,
        type: "mapel",
      }),
      paket: await getFirebaseDataByChild({
        ref: "master_paket",
        childKey: courseData,
        type: "paket",
      }),
      wilayah: await getFirebaseDataByChild({
        ref: "master_wilayah",
        childKey: courseData,
        type: "wilayah",
      }),
    };

    Object.values(masterQuery).map((item) => {
      Promise.all(masterQuery[item.type].snapshotPromise).then((snapshots) => {
        let data = {
          nama_mapel: [],
          nama_paket: [],
          jumlah_pertemuan: [],
          nama_wilayah: [],
        };

        snapshots.forEach((snapshot) => {
          if (item.type == "mapel") {
            data.nama_mapel.push(snapshot.val().nama);
          } else if (item.type == "paket") {
            data.nama_paket.push(snapshot.val().nama);
            data.jumlah_pertemuan.push(snapshot.val().jumlah_pertemuan);
          } else if (item.type == "wilayah") {
            data.nama_wilayah.push(snapshot.val().nama);
          }
        });

        if (data) {
          if (masterQuery[item.type].type == "mapel") {
            setMasterData((prevData) => ({
              ...prevData,
              mapel: {
                nama_mapel: data.nama_mapel,
              },
            }));
          } else if (masterQuery[item.type].type == "paket") {
            setMasterData((prevData) => ({
              ...prevData,
              paket: {
                nama_paket: data.nama_paket,
                jumlah_pertemuan: data.jumlah_pertemuan,
              },
            }));
          } else if (masterQuery[item.type].type == "wilayah") {
            setMasterData((prevData) => ({
              ...prevData,
              wilayah: {
                nama_wilayah: data.nama_wilayah,
              },
            }));
          }
        }
      });
    });
  };

  useEffect(() => {
    if (!courseData) {
      getCourseData();
    }
    if (courseData) {
      getMasterData();
      console.log(masterData);
    }
  }, [courseData]);

  if (courseData && masterData) {
    return (
      <div className="flex-grow md:ml-8 md:mr-8">
        <Title
          title="Pilihan Les"
          text="Daftar / Pilihan Les"
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
        {Object.values(masterData).map((item) => {
          return (
            item.nama_mapel &&
            item.nama_mapel.map((itemMapel, index) => {
              return (
                <CardItem
                  key={index}
                  title={itemMapel}
                  containerClass="mt-8"
                ></CardItem>
              );
            })
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex-grow md:ml-8 md:mr-8">
      <Title title="Pilihan Les" text="Daftar / Pilihan Les" type="pageTitle" />
      <CardItem title="Loading..." containerClass="mt-8">
        <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
      </CardItem>
    </div>
  );
};

export default ListCourse;
