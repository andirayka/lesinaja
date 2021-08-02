import {
  Button,
  CardItem,
  Title,
  CardKeyValue,
  Paginations,
  SectionFee,
  Skeleton,
} from "@components";
import React, { useEffect, useState } from "react";
import { getFirebaseDataOnce } from "@utils";

const Keuangan = () => {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const getDataFirebase = async () => {
    const getData = await getFirebaseDataOnce({ ref: `keuangan` });
    setData(getData);
    // setLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    getDataFirebase();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex-grow md:ml-8">
        <Title text="Loading..." type="pageTitle" />
        <CardItem title="Loading..." containerClass="mt-8">
          <Skeleton mainCount={[1, 2, 3, 4, 5, 6]} />
        </CardItem>
      </div>
    );
  } else {
    return (
      <div className="w-full flex-grow md:ml-8">
        {Object.entries(data).map((item, index) => {
          const [key, value] = item;
          console.log(key);
          let labaBersih =
            value.pemasukan -
            (value.pembayaran_tutor +
              value.laba_kotor +
              value.sadaqah +
              value.pengeluaran);

          return (
            <div key={index} className="mb-8">
              <Title text={`Keuangan Bulan ${value.bulan}`} type="pageTitle" />

              <div className="mt-8">
                <Button
                  text="Input Pengeluaran"
                  additionalClassName="bg-yellow-400 hover:bg-yellow-600 rounded-lg font-medium"
                />
              </div>

              <CardItem title="Rangkuman" containerClass="mt-8">
                <CardKeyValue
                  keyName="Pemasukan Biaya Les"
                  value={`Rp ${value.pemasukan}`}
                />

                <CardKeyValue
                  keyName="Pembayaran Tutor"
                  value={`Rp ${value.pembayaran_tutor}`}
                />

                <CardKeyValue
                  keyName="Laba Kotor"
                  value={`Rp ${value.laba_kotor}`}
                />

                <CardKeyValue keyName="Sadaqah" value={`Rp ${value.sadaqah}`} />

                <CardKeyValue
                  keyName="Pengeluaran"
                  value={`Rp ${value.pengeluaran}`}
                />

                <SectionFee heading="Laba Bersih" value={labaBersih} />
              </CardItem>
            </div>
          );
        })}
        <Paginations />
      </div>
    );
  }
};

export default Keuangan;
