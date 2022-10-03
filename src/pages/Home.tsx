import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import shortId from 'shortid';

import {
  setCategoryId,
  setcurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { SearchPizzaParams } from '../redux/pizza/types';
import { selectorFilter } from '../redux/filter/selectors';
import { selectorPizza } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { fetchPizzas } from '../redux/pizza/asyncActions';

import { Categories } from '../components/categories/Categories';
import { list, SortPopup } from '../components/Sort';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { PlaceholderPizzaCart } from '../components/pizzaBlock/PlaceholderPizzaCart';
import Pagination from '../components/pagination';





export const Home: React.FC = () => { 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectorFilter);
  const { items, status } = useSelector(selectorPizza);

  // const { searchValue } = React.useContext(SearchContext);
  // const [pizzas, setPizzas] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setcurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }));
    window.scrollTo(0, 0);
  };

  // если был первый рендер, то проверяем параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);


      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    // window.scrollTo(0, 0);

    getPizzas();
    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // поиск без бекенда
  // const piz = pizzas
  //   .filter((obj) => {
  //     if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <PizzaBlock key={shortId.generate()} {...obj} />);


  
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory}
          getCetegories={() => { }}
        />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Произошла ошибка</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => (
                <PlaceholderPizzaCart className="pizza-block" key={index} />
              ))
            : items.map((obj: any) => (
                <PizzaBlock
                  key={shortId.generate()}
                  {...obj}
                  path={`/pizza/${obj.id}`}
                  // key={obj.id}
                  // imageUrl={obj.imageUrl}
                  // types={obj.types}
                  // category={obj.category}
                  // rating={obj.rating}
                  // name={obj.name}
                  // price={obj.price}
                  // sizes={obj.sizes}
                />
              ))}
        </div>
      )}

      <Pagination value={currentPage} onChangePage={onChangePage} />
    </>
  );
};
