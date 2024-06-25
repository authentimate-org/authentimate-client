import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import authReducer from '../services/auth/authSlice';
import canvasReducer from '../services/canvas/canvasSlice';
import projectReducer from '../services/project/projectSlice';


const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // user: authReducer,
    auth: authReducer,
    canvas:canvasReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;