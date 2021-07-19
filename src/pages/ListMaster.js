import React from "react";
import { Title, CardItem, Button } from "@components";

const ListMaster = () => {
  return (
    <div>
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      <div className="flex flex-wrap justify-between">
        <CardItem title="Jenjang Kelas" containerClass="mt-8 w-2/5">
          <p>PAUD</p>
          <p>TK</p>
          <p>1 SD</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-blue-300 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
        <CardItem title="Mapel" containerClass="mt-8 w-2/5">
          <p>Matematika</p>
          <p>Fisika</p>
          <p>Biologi</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-blue-300 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
        <CardItem title="Paket" containerClass="mt-8 w-2/5">
          <p>1 (4 pertemuan)</p>
          <p>2 (8 pertemuan)</p>
          <p>3 (12 pertemuan)</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-blue-300 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
        <CardItem title="Wilayah" containerClass="mt-8 w-2/5">
          <p>Jawa Timur</p>
          <p>Jawa Tengah</p>
          <p>Jawa Barat</p>
          <div className="flex-row mt-8">
            <Button
              text="Lihat Lebih Banyak"
              additionalClassName="bg-blue-300 rounded-lg font-medium"
              onClick={() => {}}
            />
          </div>
        </CardItem>
      </div>
    </div>
  );
};

export default ListMaster;
