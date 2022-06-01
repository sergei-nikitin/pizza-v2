import React from 'react';
import axios from 'axios';
import shortId from 'shortid';

import { Categories } from '../components/categories/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/pizzaBlock/PizzaBlock';
import { PlaceholderPizzaCart } from '../components/pizzaBlock/PlaceholderPizzaCart';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get('https://62966f97810c00c1cb75cbe3.mockapi.io/items')
      .then((res) => setPizzas(res.data));
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
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
    </>
  );
};
