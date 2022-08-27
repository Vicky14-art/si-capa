import { configureStore } from '@reduxjs/toolkit';
import authReducers from '../features/authSlice';
import productSlice from '../features/productSlice';

export const store = configureStore({
  reducer: {
    auth:authReducers,
    product:productSlice
  },
});

