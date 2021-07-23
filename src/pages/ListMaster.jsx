import React from "react";
import { Title, CardItem, Button } from "@components";
import { Link } from "react-router-dom";

const ListMaster = () => {
  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      {/* Row 1 */}
      <div className="flex">
        <CardItem title="Jenjang Kelas" containerClass="mt-8 flex-1">
          <p>PAUD</p>
          <p>TK</p>
          <p>1 SD</p>
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
