import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteFilmTitle: "",
  isErrorDelete: false,
};

const deleteMovieSlice = createSlice({
  name: "deleteLice",
  initialState: initialState,
  reducers: {
    setDeletedTitle: (state, action) => {
      state.deleteFilmTitle = action.payload;
    },
    setError: (state, action) => {
      state.isErrorDelete = action.payload;
    },
  },
});

export const deleteTitleActions = deleteMovieSlice.actions;

export default deleteMovieSlice.reducer;
