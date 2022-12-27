import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        brands: [] as Array<string>,
        categories: [] as Array<string>,
        priceRange: [] as Array<number>,
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
        },
        setPriceRange: (state, action: PayloadAction<number[]>) => {
            state.priceRange = action.payload;
        },
    }
})

export const filters = (state: RootState) => state.filters;

export const {brandHandler, categoryHandler, resetFilters, setBrands, setCategories, setPriceRange} = filtersSlice.actions;
export default filtersSlice.reducer;