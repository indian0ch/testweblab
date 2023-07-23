import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteUrl: `${process.env.REACT_APP_API_URL}/movies/`,
  addUrl: `${process.env.REACT_APP_API_URL}/movies`,
  getList: `${process.env.REACT_APP_API_URL}/movies?limit=5`,
  getSortList:
  `${process.env.REACT_APP_API_URL}/movies?sort=title&order=DESC&limit=5`,
  import:`${process.env.REACT_APP_API_URL}/movies/import`,
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
