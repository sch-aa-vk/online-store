import { configureStore } from '@reduxjs/toolkit';
import products from 'store/slices/products.slice';
import cart from 'store/slices/cart.slice';

const store = configureStore({
  reducer: {
    products,
    cart
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;