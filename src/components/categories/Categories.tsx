import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: any;
}

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
// export const Categories: React.FC = ({ value, onClickCategory }:CategoriesProps) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
