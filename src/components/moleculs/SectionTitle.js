import React from 'react';

const SectionTitle = ({ heading, body }) => {
  return (
    <div>
      <p className="text-left text-2xl font-bold">{heading}</p>

      {body && <p className="text-left text-base mt-1">{body}</p>}
    </div>
  );
};

export default SectionTitle;
