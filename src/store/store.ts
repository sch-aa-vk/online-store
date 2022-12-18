import { configureStore } from '@reduxjs/toolkit';
import products from 'store/slices/products.slice';
import cart from 'store/slices/cart.slice';
import filters from 'store/slices/filters.slice';

const store = configureStore({
  reducer: {
    products,
    cart,
    filters,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;