import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenJwt: 0,
  isLogin: false,
};

const tokenSlice = createSlice({
  name: "tokenLoader",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokenJwt = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const tokenLoaderActions = tokenSlice.actions;

export default tokenSlice.reducer;
