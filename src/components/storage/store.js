import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import urlReducer from "./urlSlice";
import tokenReducer from "./tokenSlice";

const rootReducer = combineReducers({
  urlManage: urlReducer,
  tokenLoader: tokenReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
