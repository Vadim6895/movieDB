import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import api from '../api';
import { PremieresFilms } from '../types';

const todoApi = createApi({
  reducerPath: 'filmsApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getFilms: builder.query({
      queryFn: (params) => api.getFilms(params),
    }),
    getSliderFilms: builder.query({
      queryFn: (params) => api.getFilms(params, process.env.D_API_2),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
    }),
    getPremiereFilms: builder.query<PremieresFilms, void>({
      queryFn: async () => api.getPremiereFilms(),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
    }),
    getFilm: builder.query({
      queryFn: (id) => api.getFilm(id),
    }),
    searchFilm: builder.query({
      queryFn: (params) => api.searchFilm(params.params),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, responseData, { arg }) => {
        if (arg.type === 'text') {
          return responseData;
        }
        currentCache.films.push(...responseData.films);
        return currentCache;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetSliderFilmsQuery,
  useGetPremiereFilmsQuery,
  useGetFilmQuery,
  useLazySearchFilmQuery,
} = todoApi;
export default todoApi;
