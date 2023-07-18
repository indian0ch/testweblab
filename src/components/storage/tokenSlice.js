import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isColorActive: 0,
};

const colorChoosenSlice = createSlice({
  name: "colorChoose",
  initialState: initialState,
  reducers: {
    changeButtonId: (state, action) => {
      const id = action.payload;
      state.isColorActive = id;
    },
  },
});
export const colorChoosenActions = colorChoosenSlice.actions;

export default colorChoosenSlice.reducer;
