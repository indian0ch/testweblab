import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteUrl: "http://localhost:8000/api/v1/movies/",
  addUrl: "http://localhost:8000/api/v1/movies",
  getList: "http://localhost:8000/api/v1/movies?limit=5",
  getSortList:
    "http://localhost:8000/api/v1/movies?sort=title&order=DESC&limit=5",
  import:"http://localhost:8000/api/v1/movies/import",
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
