import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
  getCetegories: (categories: string[]) => void;
}

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory, getCetegories }) => {
// export const Categories: React.FC = ({ value, onClickCategory }:CategoriesProps) => {
getCetegories(categories)

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
