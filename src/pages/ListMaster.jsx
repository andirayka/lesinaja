import React, { useContext, useEffect } from "react";
import { Title, CardItem, Button, Skeleton, EmptyIcon } from "@components";
import { Link } from "react-router-dom";
import { ContextMaster } from "@context";

const ListMaster = () => {
  const {
    state: { listData, formStatus },
    getListData,
  } = useContext(ContextMaster);

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      {/* Row 1 */}
      {/* jenjangKelas */}
      <div className="flex">
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          <>
            {formStatus == "loading" && (
              <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
            )}

            {formStatus == "empty" && <EmptyIcon />}

            {listData &&
              Object.values(listData).map((item, index) => {
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
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {}}
                />
              </Link>
            </div>
          </>
        </CardItem>

        {/* mapel */}
        <div className="mx-5"></div>
        <CardItem title="Mapel" containerClass="mt-8 flex-1">
          <>
            {formStatus == "loading" && (
              <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
            )}

            {formStatus == "empty" && <EmptyIcon />}

            {listData &&
              Object.values(listData).map((item, index) => {
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
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {}}
                />
              </Link>
            </div>
          </>
        </CardItem>
      </div>

      {/* Row 2 */}
      {/* paket */}
      <div className="flex">
        <CardItem title="Paket" containerClass="mt-8 flex-1">
          <>
            {formStatus == "loading" && (
              <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
            )}

            {formStatus == "empty" && <EmptyIcon />}

            {listData &&
              Object.values(listData).map((item, index) => {
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
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {}}
                />
              </Link>
            </div>
          </>
        </CardItem>

        {/* wilayah */}
        <div className="mx-5"></div>
        <CardItem title="Wilayah" containerClass="mt-8 flex-1">
          <>
            {formStatus == "loading" && (
              <Skeleton mainCount={[1, 2, 3]} subCount={[1]} />
            )}

            {formStatus == "empty" && <EmptyIcon />}

            {listData &&
              Object.values(listData).map((item, index) => {
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
                  text="Kelola"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                  onClick={() => {}}
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
