import React, { FC } from "react";

interface Props {
  heading: string;
  body?: string;
  containerClass?: string;
}

const SectionTitle: FC<Props> = ({ heading, body, containerClass }) => {
  return (
    <div className={containerClass}>
      <p className="text-2xl font-bold">{heading}</p>

      {body && <p className="text-base mt-1">{body}</p>}
    </div>
  );
};

export default SectionTitle;
