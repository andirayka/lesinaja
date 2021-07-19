import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  return (
    <div className="flex flex-row justify-center">
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={4}
        containerClassName=""
        subContainerClassName=""
      />
    </div>
  );
};

export default Pagination;
