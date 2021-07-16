import React from 'react';

const ContentContainer = ({ children }) => {
  return (
    <div className="flex-grow md:flex-grow-0 bg-white rounded-lg p-6">
      {children}
    </div>
  );
};

export default ContentContainer;
