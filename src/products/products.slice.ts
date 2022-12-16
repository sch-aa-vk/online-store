import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { initialState } from './listOfProducts';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      if (action.payload === 'big ratings first') {
        state.sort((a, b) => b.rating - a.rating);
      } else if (action.payload === 'low ratings first') {
        state.sort((a, b) => a.rating - b.rating);
      }
      
    }
  }
})

export const { addProduct, sortProducts } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;