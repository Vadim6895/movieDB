import { configureStore } from '@reduxjs/toolkit';

import filmsApi from './filmsApi';

const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
