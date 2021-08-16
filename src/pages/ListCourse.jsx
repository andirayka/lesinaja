import React, { useEffect, useState } from "react";
import { Title, CardItem, Button, Skeleton, CardKeyValue } from "@components";
import { Link } from "react-router-dom";
import { getFirebaseDataOnce } from "@utils";

const ListCourse = () => {
  // Belum ada handle jika sudah get data dan data kosong
  const [courseData, setCourseData] = useState(undefined);

  useEffect(() => {
    const getCourseData = async () => {
      const courses = await getFirebaseDataOnce({ ref: "master_les" });

      if (courses) {
        const arrCourses = await Promise.all(
          Object.entries(courses).map(async ([key, value]) => {
            const finalValue = {
              ...value,
              jenjangkelas: await getFirebaseDataOnce({
                ref: `master_jenjangkelas/${value.jenjangkelas}/nama`,
              }),
              mapel: await getFirebaseDataOnce({
                ref: `master_mapel/${value.mapel}/nama`,
              }),
              paket: await getFirebaseDataOnce({
                ref: `master_paket/${value.paket}/nama`,
              }),
              wilayah: await getFirebaseDataOnce({
                ref: `master_wilayah/${value.wilayah}/nama`,
              }),
            };

            return [key, finalValue];
          })
        );
        setCourseData(arrCourses);
      }
    };

    getCourseData();
  }, []);

  if (courseData) {
    return (
      <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
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
        {Object.values(courseData).map(([key, value]) => {
          return (
            <CardItem key={key} title={value.mapel} containerClass="mt-8">
              <CardKeyValue
                keyName="Jenjang Kelas"
                value={value.jenjangkelas}
              />
              <CardKeyValue keyName="Paket" value={value.paket} />
              <CardKeyValue keyName="Wilayah" value={value.wilayah} />
            </CardItem>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex-grow md:ml-8 md:mr-8 md:mb-8">
      <Title title="Pilihan Les" text="Daftar / Pilihan Les" type="pageTitle" />
      <CardItem title="Loading..." containerClass="mt-8">
        <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
      </CardItem>
    </div>
  );
};

export default ListCourse;
