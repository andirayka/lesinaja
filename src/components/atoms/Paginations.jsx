import React from 'react';
import Pagination from 'react-js-pagination';

const Paginations = () => {
  return (
    <div className="flex flex-row justify-center">
      <Pagination
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={100}
        pageRangeDisplayed={3}
        itemClass="inline-block m-2 p-4 bg-yellow-400 rounded-xl"
        onChange={() => {}}
      />
    </div>
  );
};

export default Paginations;
