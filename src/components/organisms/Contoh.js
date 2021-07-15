import React from "react";

const Contoh = ({ bgColor, button }) => {
  return (
    <div style={{ backgroundColor: bgColor }}>
      Ganti warna
      {button}
    </div>
  );
};

export default Contoh;
