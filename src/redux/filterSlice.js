import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filtertSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    changeFilterFild(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilterFild } = filtertSlice.actions;
export const filterReducer = filtertSlice.reducer;
