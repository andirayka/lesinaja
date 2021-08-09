import React, { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
    document.title = "LesinAja - BIMBEL & LES PRIVAT";
  }, []);
  return <div>Landing</div>;
};

export default Landing;
