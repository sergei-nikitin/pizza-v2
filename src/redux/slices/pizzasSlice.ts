import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

// type FetchPizzasArgs = Record<string, string>
 
// type FetchPizzasArgs = {
//   sortBy: string;
//   order: string;
//   category: string;
//   search: string;
//   currentPage: string;
// }

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasByIdStatus',
  async (params) => { 
  // async (params: Record<string, string>) => {
  // async (params: FetchPizzasArgs) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62966f97810c00c1cb75cbe3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data ;
    // return data as CartItem[];
  },
);

type Pizza = {
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

interface PizzaSliceState {
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

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, 
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
  })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
  })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
  })
}

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectorPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
