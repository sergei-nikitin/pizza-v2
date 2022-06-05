import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import shortId from 'shortid';

import { setCategoryId } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { Categories } from '../components/categories/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { PlaceholderPizzaCart } from '../components/pizzaBlock/PlaceholderPizzaCart';
import Pagination from '../components/pagination';

export const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62966f97810c00c1cb75cbe3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => setPizzas(res.data));
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <PlaceholderPizzaCart key={index} />
            ))
          : pizzas.map((obj) => (
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
      {/* </div> */}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};
