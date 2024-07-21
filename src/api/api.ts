import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { auth } from '../config/firebase';


const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const state = api.getState() as RootState;
  let token = state.auth.token;

  if (!token) {
    const currentUser = auth.currentUser;
    if (currentUser) {
      token = await currentUser.getIdToken();
      console.log(token)
    }
  }

  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_BASE_URL_DEV, 
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
