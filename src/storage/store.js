import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import tokenReducer from "./tokenSlice";
import paginationReducer from "./paginationSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  tokenLoader: tokenReducer,
  paginationCounter: paginationReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;
