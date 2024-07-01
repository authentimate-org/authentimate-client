import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store'; 

export interface RegisterResponse {
  message: string;
}

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const state = api.getState() as RootState;
  const token = state.auth.token; 

  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});