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
        case 'choose sort':
          state.sort((a, b) => a.id - b.id);
          break;
      }      
    }
  }
})

export const { addProduct, sortProducts } = productsSlice.actions;

let filteredProducts = (state: RootState) => {
  const hasRange = state.filters.priceRange.length && state.filters.priceRange[1] !== 0;
  const hasStockRange = state.filters.stockRange.length && state.filters.stockRange[1] !== 0;
  const hasBrands = state.filters.brands.length;
  const hasCategories = state.filters.categories.length;
  const hasValue = state.filters.value.length;

  let filtered = state.products;

  if (hasBrands) {
    filtered = filtered.filter((product) => state.filters.brands.includes(product.brand));
  }
  if (hasCategories) {
    filtered = filtered.filter((product) => state.filters.categories.includes(product.category));
  }
  if (hasValue) {
    filtered = filtered.filter((product) => 
      product.brand.toLowerCase().includes(state.filters.value[0].toLowerCase()) || product.category.toLowerCase().includes(state.filters.value[0].toLowerCase()) ||
      product.title.toLowerCase().includes(state.filters.value[0].toLowerCase()) || product.description.toLowerCase().includes(state.filters.value[0].toLowerCase()) ||
      product.price.toString().includes(state.filters.value[0]) || product.discountPercentage.toString().includes(state.filters.value[0]) ||
      product.rating.toString().includes(state.filters.value[0]) || product.stock.toString().includes(state.filters.value[0])
    )
  }
  if (hasRange) {
    filtered = filtered.filter((product) => product.price >= state.filters.priceRange[0] && product.price <= state.filters.priceRange[1]);
  }
  if (hasStockRange) {
    filtered = filtered.filter((product) => product.stock >= state.filters.stockRange[0] && product.stock <= state.filters.stockRange[1]);
  }

  return filtered;
}

export const getProductsSelector = filteredProducts;

export default productsSlice.reducer;