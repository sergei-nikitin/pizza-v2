import React from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

type PaginationProps = {
  value: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ value, onChangePage }) => {

  return (
    <ReactPaginate
      className={s.paginate}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
    onChangePage(event.selected + 1)
  }}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={value - 1}
      previousLabel="<"
      // renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
