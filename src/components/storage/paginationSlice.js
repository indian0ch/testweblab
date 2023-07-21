import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNextAvailable: true,
};

const paginationSlice = createSlice({
  name: "paginationCounter",
  initialState: initialState,
  reducers: {
    setNextAvailable: (state, action) => {
      const status = action.payload;
      state.isNextAvailable = status;
    },
  },
});

export const paginationCounterActions = paginationSlice.actions;

export default paginationSlice.reducer;
