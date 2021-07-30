import React from "react";

const ContentContainer = ({ children, additionalClassName }) => {
  return <div className={additionalClassName}>{children}</div>;
};

export default ContentContainer;
