import React from "react";

const SectionTitle = ({ heading, body }) => {
  return (
    <div>
      <h1 className="font-bold text-4xl mb-4">{heading}</h1>

      {body && <p>{body}</p>}
    </div>
  );
};

export default SectionTitle;
