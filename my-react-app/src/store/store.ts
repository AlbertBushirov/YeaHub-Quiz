// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";

import quizStateReducer from "../features/quiz/quizSlice.js";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    quizState: quizStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
