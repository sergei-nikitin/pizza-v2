import React from 'react';
import qs from 'qs';
// import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import shortId from 'shortid';

import {
  setCategoryId,
  setcurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { SearchContext } from '../App';
import { Categories } from '../components/categories/Categories';
import { list, Sort } from '../components/Sort';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { PlaceholderPizzaCart } from '../components/pizzaBlock/PlaceholderPizzaCart';
import Pagination from '../components/pagination';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );
  const { items, status } = useSelector((state) => state.pizza);

  const { searchValue } = React.useContext(SearchContext);
  // const [pizzas, setPizzas] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number) => {
    dispatch(setcurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
    window.scrollTo(0, 0);

    // await axios
    //   .get(
    //     `https://62966f97810c00c1cb75cbe3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setPizzas(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });

    // try {
    //   // const { data } = await axios.get(
    //   //   `https://62966f97810c00c1cb75cbe3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   // );
    //   // dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
    //   // setPizzas(res.data);
    // } catch (error) {
    //   console.log(error);

    //   alert(error);
    // } finally {
    //   // setIsLoading(false);
    // }
  };

  // ???????? ?????? ???????????? ????????????, ???? ?????????????????? ?????????????????? ?? ?????????????????? ?? ??????????????
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);
  // ???????? ?????? ???????????? ????????????, ???? ?????????????????????? ??????????
  React.useEffect(() => {
    // window.scrollTo(0, 0);

    getPizzas();

    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // ???????? ???????????????????? ?????????????????? ?? ?????? ???????????? ????????????
  React.useEffect(() => {
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

  // ?????????? ?????? ??????????????
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
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div>
          <h2>?????????????????? ????????????</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => (
                <PlaceholderPizzaCart key={index} />
              ))
            : items.map((obj) => (
                <PizzaBlock
                  key={shortId.generate()}
                  {...obj}
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
