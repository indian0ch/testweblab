import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteUrl: "http://localhost:8000/api/v1/movies/1",
  addUrl: "http://localhost:8000/api/v1/movies",
  getList: "http://localhost:8000/api/v1/movies/",
  getSortList:
    "http://localhost:8000/api/v1/movies?sort=title&order=DESC&limit=10&offset=0",
};

const urlSlice = createSlice({
  name: "urlManage",
  initialState: initialState,
  reducers: {
    changeDeleteUrl: (state, action) => {
      const url = action.payload;
      state.deleteUrl = url;
    },
  },
});
export const urlSliceActions = urlSlice.actions;

export default urlSlice.reducer;
