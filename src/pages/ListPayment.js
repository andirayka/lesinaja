import React from "react";
import {
  Title,
  CardItem,
  Button,
  CardKeyValue,
  InputSearch,
} from "@components";

const ListPayment = () => {
  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Riwayat Pembayaran" type="pageTitle" />

      <InputSearch />

      <CardItem title="Wali Murid Sucipto ke Lesin Aja" containerClass="mt-8">
        <CardKeyValue keyName="Waktu Pembayaran" value="12 Juli 2021, 14:45" />
        <CardKeyValue keyName="Nominal" value="Rp 200.000" />
        <div className="flex-row mt-8">
          <Button
            text="Unduh Bukti Pembayaran"
            additionalClassName="bg-blue-300 rounded-lg font-medium"
            onClick={() => {}}
          />
          <Button
            text="Konfirmasi Uang Sudah Masuk"
            additionalClassName="bg-yellow-500 rounded-lg font-medium ml-5"
            onClick={() => {}}
          />
        </div>
      </CardItem>
      <CardItem title="Lesin Aja ke Tutor Mulyani" containerClass="mt-8">
        <CardKeyValue keyName="Waktu Pembayaran" value="12 Juli 2021, 14:45" />
        <CardKeyValue keyName="Nominal" value="Rp 200.000" />
        <div className="flex-row mt-8">
          <Button
            text="Tandai Sudah Transfer"
            additionalClassName="bg-yellow-500 rounded-lg font-medium"
            onClick={() => {}}
          />
        </div>
      </CardItem>
    </div>
  );
};

export default ListPayment;
