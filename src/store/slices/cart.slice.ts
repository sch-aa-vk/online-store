import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'store/interface/IProduct';
import { RootState } from 'store/store';

const cartSlice = createSlice({
  name: 'cart',
  initialState: (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']).cart as IProduct[] : [] as IProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(product => product.id === action.payload.id);
      if (productIndex !== - 1) {
        if (state[productIndex].amount < state[productIndex].stock) {
          state[productIndex].amount += 1;
        }
      } else {
        state.push({...action.payload, amount: 1});
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productIndex = state.findIndex(product => product.id === action.payload);
      if (state[productIndex].amount > 1) {
        state[productIndex].amount -= 1;
      } else {
        return state.filter(product => product.id !== action.payload);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      return state.filter(product => product.id !== action.payload);
    }
  }
})

export const getCartProducts = (state: RootState) => state.cart;
export const getTotalPrice = (state: RootState) => state.cart.reduce((acc, next) => acc += (next.amount * next.price),0);

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;