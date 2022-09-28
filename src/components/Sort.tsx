import React, {useRef, useEffect} from 'react';
// import shortId from 'shortid';
import { useDispatch } from 'react-redux';

import { Sort, SortPropertyEnum } from '../redux/filter/types';
import { setSort } from '../redux/filter/slice';

type SortItem = {
  title: string;
  sortProperty: SortPropertyEnum;
}

type PopupClick = MouseEvent & {
  path: Node[]
}

type SortPopupProps = {
  value: Sort;
}

export const list: SortItem[] = [
  { title: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { title: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { title: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { title: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { title: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.NAME_DESC },
  { title: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.NAME_ASC },
];

export const SortPopup: React.FC<SortPopupProps> = React.memo(
  ({value}) => {
  const dispatch = useDispatch();
  // const sort = useSelector(selectorFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const onItemClick = (i: SortItem) => {
    dispatch(setSort(i));
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    // при размонтировании
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.title}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                key={obj.title}
                onClick={() => onItemClick(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? 'active' : ''
                }>
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
);
