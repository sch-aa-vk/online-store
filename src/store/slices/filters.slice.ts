import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        brands: [] as Array<string>,
        categories: [] as Array<string>
    },
    reducers: {
        brandHandler: (state, action: PayloadAction<{brand: string, checked: boolean}>) => {
            console.log(action);
            if (action.payload.checked) {
                if (state.brands.indexOf(action.payload.brand) === -1) {
                    state.brands.push(action.payload.brand)
                }
            } else {
                console.log('working');
                let index = state.brands.indexOf(action.payload.brand);
                if (index !== -1) {
                    state.brands.splice(index, 1);
                }
            }
        },
        // TODO: refactor this to look like code above
        addCategory: (state, action: PayloadAction<string>) => {
            state.categories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            let index = state.categories.indexOf(action.payload);
            state.categories.splice(index, 1);
        },
    }
})

export const filters = (state: RootState) => state.filters;

export const {brandHandler, addCategory, removeCategory} = filtersSlice.actions;
export default filtersSlice.reducer;