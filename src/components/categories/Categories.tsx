import React from 'react';
// import  useWhyDidYouUpdate  from 'ahooks/lib/useWhyDidYouUpdate';

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

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory, getCetegories }) => {
// export const Categories: React.FC = ({ value, onClickCategory }:CategoriesProps) => {
getCetegories(categories)
// useWhyDidYouUpdate('Categories', { value, onClickCategory })
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
}
)
