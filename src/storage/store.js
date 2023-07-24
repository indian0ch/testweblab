import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import tokenReducer from "./tokenSlice";
import paginationReducer from "./paginationSlice";

const rootReducer = combineReducers({
  tokenLoader: tokenReducer,
  paginationCounter: paginationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
