import React from "react";
import { Title, CardItem, Button, CardKeyValue } from "@components";

const ListPayment = () => {
  return (
    <div>
      <Title text="Daftar Data Master Aplikasi" type="pageTitle" />

      <CardItem title="Wali Murid Sucipto ke Lesin Aja" containerClass="mt-8">
        <div className="flex-row mt-8">
          <Button
            text="Lihat Lebih Banyak"
            additionalClassName="bg-blue-300 rounded-lg font-medium"
            onClick={() => {}}
          />
        </div>
      </CardItem>
    </div>
  );
};

export default ListPayment;
