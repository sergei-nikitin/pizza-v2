import React from 'react';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={category}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
