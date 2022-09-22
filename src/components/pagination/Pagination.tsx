import React from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

type PaginationProps = {
  value: number;
  onChangePage: any;
}

const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) => {
  const handlePageClick = (event: any) => {
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
      forcePage={value - 1}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
