import React, { useEffect } from "react";
import {
  Title,
  CardItem,
  Button,
  CardKeyValue,
  InputSearch,
} from "@components";
import { getFirebaseDataOnce } from "@utils";

const ListPayment = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="w-full flex-grow md:ml-8">
      <Title text="Daftar Riwayat Pembayaran" type="pageTitle" />

      <InputSearch />

      <CardItem title="Wali Murid Sucipto ke Lesin Aja" containerClass="mt-8">
        <CardKeyValue keyName="Waktu Pembayaran" value="12 Juli 2021, 14:45" />
        <CardKeyValue keyName="Nominal" value="Rp 200.000" />
        <div className="flex flex-row mt-8">
          <Button
            text="Unduh Bukti Pembayaran"
            additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
            onClick={() => {}}
          />
          <Button
            text="Konfirmasi Uang Sudah Masuk"
            additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium ml-5"
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
            additionalClassName="bg-yellow-600 hover:bg-yellow-300 rounded-lg font-medium"
            onClick={() => {}}
          />
        </div>
      </CardItem>
    </div>
  );
};

export default ListPayment;
