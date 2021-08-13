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
    mapel: undefined,
    paket: undefined,
    wilayah: undefined,
  });

  const [loading, setLoading] = useState(true);

  const [courseData, setCourseData] = useState(undefined);

  const getCourseData = async () => {
    const courseQuery = await getFirebaseDataOnce({ ref: "master_les" });
    setCourseData(Object.values(courseQuery));
  };

  const getMasterData = async () => {
    const masterQuery = {
      mapel: await getFirebaseDataByChild("master_mapel", courseData, "mapel"),
      paket: await getFirebaseDataByChild("master_paket", courseData, "paket"),
      wilayah: await getFirebaseDataByChild(
        "master_wilayah",
        courseData,
        "wilayah"
      ),
    };

    Object.values(masterQuery).map((item) => {
      Promise.all(masterQuery[item.type].snapshotPromise).then((snapshots) => {
        let data = {
          mapel: {
            nama: [],
          },
          paket: {
            nama: [],
            jumlah_pertemuan: [],
          },
          wilayah: {
            nama: [],
          },
        };

        snapshots.forEach((snapshot) => {
          if (item.type == "mapel") {
            data.mapel.nama.push(snapshot.val().nama);
          } else if (item.type == "paket") {
            data.paket.nama.push(snapshot.val().nama);
            data.paket.jumlah_pertemuan.push(snapshot.val().jumlah_pertemuan);
          } else if (item.type == "wilayah") {
            data.wilayah.nama.push(snapshot.val().nama);
          }
        });

        if (data.length !== 0) {
          if (masterQuery[item.type].type == "mapel") {
            setMasterData((prevData) => ({
              ...prevData,
              mapel: {
                nama: data.mapel.nama,
              },
            }));
          } else if (masterQuery[item.type].type == "paket") {
            setMasterData((prevData) => ({
              ...prevData,
              paket: {
                nama: data.paket.nama,
                jumlah_pertemuan: data.paket.jumlah_pertemuan,
              },
            }));
          } else if (masterQuery[item.type].type == "wilayah") {
            setMasterData((prevData) => ({
              ...prevData,
              wilayah: {
                nama: data.wilayah.nama,
              },
            }));
          }
        }
      });
    });
  };

  const cardRender = () => {
    if (
      courseData &&
      masterData.mapel &&
      masterData.paket &&
      masterData.wilayah
    ) {
      return <div>data loaded</div>;
    } else {
      return (
        <div className="w-full flex-grow md:ml-8">
          <Title text="Daftar Pilihan Les" type="pageTitle" />
          <CardItem title="Loading..." containerClass="mt-8">
            <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
          </CardItem>
        </div>
      );
    }
  };

  useEffect(() => {
    if (!courseData) {
      getCourseData();
    }
    if (courseData) {
      getMasterData();
    }
    console.log(masterData);
  }, [courseData]);

  return cardRender();
};

export default ListCourse;
