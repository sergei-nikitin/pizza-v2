import React from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
  };

  return (
    <ReactPaginate
      className={s.paginate}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
