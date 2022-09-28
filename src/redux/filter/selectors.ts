import { RootState } from "../store";

export const selectorFilter = (state: RootState) => state.filter;
export const selectorSort = (state: RootState) => state.filter.sort;