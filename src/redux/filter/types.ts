export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  NAME_DESC = 'name',
  NAME_ASC = '-name',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',

}

export type Sort = {
  title: string;
  sortProperty: SortPropertyEnum;
  // sortProperty: string;
  }

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}