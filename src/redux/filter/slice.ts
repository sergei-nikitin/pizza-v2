import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    title: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setcurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setcurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;