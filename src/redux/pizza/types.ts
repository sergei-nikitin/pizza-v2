export type Pizza = {
  id: string;
  imageUrl: string;
  types: number[];
  category: number;
  rating: number;
  name: string;
  price: number;
  sizes: number[];
  path: any;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  // sortBy: Sort;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}