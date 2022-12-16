import { IProduct } from '../../components/products/products.slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../functions/store/store';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as IProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(product => product.id === action.payload.id);
      if (productIndex !== - 1) {
        state[productIndex].amount += 1;
      } else {
        state.push({...action.payload});
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex(product => product.id === action.payload);
      if (state[productIndex].amount > 1) {
        state[productIndex].amount -= 1;
      } else {
        return state.filter(product => product.id !== action.payload);
      }
    }
  }
})

export const getCartProducts = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) => state.cart.reduce((acc, next) => acc += (next.amount * next.price),0);

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;