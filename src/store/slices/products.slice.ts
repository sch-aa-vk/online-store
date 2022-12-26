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

// TODO: add price and stock in the future
let filteredProducts = (state: RootState) => { 
  let filtered = state.products;

  if (state.filters.brands.length) {
    filtered = state.products.filter((product) => state.filters.brands.includes(product.brand));
  }
  if (state.filters.categories.length) {
    filtered = state.products.filter((product) => state.filters.categories.includes(product.category));
  }
  if (state.filters.priceRange.length && state.filters.priceRange[1] !== 0) {
    filtered = state.products.filter((product) => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1]);
  }

  return filtered;
};

export const getProductsSelector = filteredProducts;

export default productsSlice.reducer;