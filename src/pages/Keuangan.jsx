import {
  Button,
  CardItem,
  Title,
  CardKeyValue,
  Paginations,
  SectionFee,
} from "@components";
import React from "react";

const Keuangan = () => {
  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text={`Keuangan Bulan Juli 2021`} type="pageTitle" />

      <div className="mt-8">
        <Button
          text="Input Pengeluaran"
          additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
        />
      </div>

      <CardItem title="Rangkuman" containerClass="mt-8">
        <CardKeyValue keyName="Pemasukan Biaya Les" value="Rp 500.000" />

        <CardKeyValue keyName="Pembayaran Tutor" value="Rp 400.000" />

        <CardKeyValue keyName="Laba Kotor" value="Rp 100.000" />

        <CardKeyValue keyName="Sadaqah" value="Rp 20.000" />

        <CardKeyValue keyName="Pengeluaran" value="Rp 50.000" />

        <SectionFee heading="Laba Bersih" value="Rp 400.000" />
      </CardItem>

      <Paginations />
    </div>
  );
};

export default Keuangan;
