import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import authReducer from '../services/auth/authSlice';
import issuerReducer from '../services/auth/issuerSlice';
import canvasReducer from '../services/canvas/canvasSlice';
import projectReducer from '../services/project/projectSlice';


const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    issuer: issuerReducer,
    canvas:canvasReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;