import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import urlReducer from "./urlSlice";

const rootReducer = combineReducers({
  urlManage: urlReducer,
  //   cartFunctional: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
