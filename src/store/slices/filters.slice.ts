import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        brands: [] as Array<string>,
        categories: [] as Array<string>,
        priceRange: [] as Array<number>,
        stockRange: [] as Array<number>,
        value: [] as Array<string>
    },
    reducers: {
        brandHandler: (state, action: PayloadAction<{brand: string, checked: boolean}>) => {
            if (action.payload.checked) {
                if (state.brands.indexOf(action.payload.brand) === -1) {
                    state.brands.push(action.payload.brand)
                }
            } else {
                let index = state.brands.indexOf(action.payload.brand);
                if (index !== -1) {
                    state.brands.splice(index, 1);
                }
                state.priceRange = [10, 1749];
            }
        },
        categoryHandler: (state, action: PayloadAction<{category: string, checked: boolean}>) => {
            if (action.payload.checked) {
                if (state.categories.indexOf(action.payload.category) === -1) {
                    state.categories.push(action.payload.category)
                }
            } else {
                let index = state.categories.indexOf(action.payload.category);
                if (index !== -1) {
                    state.categories.splice(index, 1);
                }
                state.priceRange = [10, 1749];
            }
        },
        setBrands: (state, action: PayloadAction<string[]>) => {
            state.brands = action.payload;
        },
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
        resetFilters: (state) => {
            state.categories = [];
            state.brands = [];
            state.priceRange = [10, 1749];
            state.stockRange = [2, 150];
        },
        setPriceRange: (state, action: PayloadAction<number[]>) => {
            state.priceRange = action.payload;
        },
        setStockRange: (state, action: PayloadAction<number[]>) => {
            state.stockRange = action.payload;
        },
        setValueChange: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload;
            if (action.payload = ['']) {
                state.priceRange = [10, 1749];
            }
        }
    }
})

export const filters = (state: RootState) => state.filters;
export const {brandHandler, categoryHandler, resetFilters, setBrands, setCategories, setPriceRange, setStockRange, setValueChange} = filtersSlice.actions;
export default filtersSlice.reducer;