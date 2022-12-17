import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { initialState } from 'store/database/products';
import { IProduct } from 'store/interface/IProduct';

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      switch(action.payload) {
        case 'big ratings first':
          state.sort((a, b) => b.rating - a.rating);
          break;
        case 'low ratings first':
          state.sort((a, b) => a.rating - b.rating);
          break;
        case 'big price first':
          state.sort((a, b) => b.price - a.price);
          break;
        case 'low price first':
          state.sort((a, b) => a.price - b.price);
          break;
        case 'big discount first':
          state.sort((a, b) => b.discountPercentage - a.discountPercentage);
          break;
        case 'low discount first':
          state.sort((a, b) => a.discountPercentage - b.discountPercentage);
          break;
      }      
    }
  }
})

export const { addProduct, sortProducts } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;