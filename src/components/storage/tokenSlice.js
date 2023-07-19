import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenJwt: 0,
};

const tokenSlice = createSlice({
  name: "tokenLoader",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokenJwt = action.payload;
    },
  },
});

export const tokenLoaderActions = tokenSlice.actions;

export default tokenSlice.reducer;
