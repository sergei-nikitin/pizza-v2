import React from 'react';
import axios from 'axios';
import shortId from 'shortid';
import Spline from '@splinetool/react-spline';

import { Categories } from '../components/categories/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { PlaceholderPizzaCart } from '../components/pizzaBlock/PlaceholderPizzaCart';
import Pagination from '../components/pagination';

export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    title: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
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
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onClickCategory={(i) => setSortType(i)} />
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

      <Spline
        scene="https://prod.spline.design/
TRfTj83xgjIdHPmT/scene.spline"
      />
    </>
  );
};
