import React, {useCallback, useState, useRef} from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';
import { selectorFilter } from '../../redux/slices/filterSlice';

// import { SearchContext } from '../../App';
import s from './Search.module.scss';

const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const searchValue = useSelector(selectorFilter);

  const updateSearchValue =useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };



  const onClear = (event: React.MouseEvent<SVGSVGElement>) => {
    dispatch(setSearchValue(''));
    setValue('');
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  // }
    inputRef.current?.focus();
  };

  return (
    <div className={s.wrapper}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск..."
      />
      <svg
        className={s.search}
        enableBackground="new 0 0 26 26"
        id="search"
        version="1.1"
        viewBox="0 0 26 26">
        <path
          d="M14.9462891,1C9.4033203,1,4.8935547,5.5097656,4.8935547,11.0532227  c0,2.5022583,0.9248047,4.7885132,2.4428101,6.5498657l-6.1166382,6.1166382c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266l6.1165771-6.1165771  c1.7612305,1.5180054,4.0474243,2.442749,6.5494385,2.442749C20.4902344,21.1064453,25,16.5966797,25,11.0532227  S20.4902344,1,14.9462891,1z M14.9462891,19.6064453c-4.7158203,0-8.5527344-3.8369141-8.5527344-8.5532227  S10.2304688,2.5,14.9462891,2.5C19.6630859,2.5,23.5,6.3369141,23.5,11.0532227S19.6630859,19.6064453,14.9462891,19.6064453z"
          fill="#bdbdbd"
        />
      </svg>
      {searchValue && (
        <svg
          onClick={onClear}
          className={s.close}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path
            id="path"
            d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"
            fill="#bdbdbd"
          />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
