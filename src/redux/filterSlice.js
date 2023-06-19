import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';


const filtertSlice = createSlice({
  name: 'filter',
  initialState: initialState.filter,
  reducers: {
    changeFilterFild(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilterFild } = filtertSlice.actions;
export const filterReducer = filtertSlice.reducer;
