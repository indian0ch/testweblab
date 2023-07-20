import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagesCount: 0,
};

const paginationSlice = createSlice({
  name: "paginationCounter",
  initialState: initialState,
  reducers: {
    setPageCounters: (state, action) => {
      const arrLength = action.payload;
      state.pagesCount = Math.ceil(arrLength / 5);
    },
  },
});

export const paginationCounterActions = paginationSlice.actions;

export default paginationSlice.reducer;
