import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

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