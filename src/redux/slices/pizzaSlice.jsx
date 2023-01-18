import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { category, search, currentPage, sortType } = params;
    const { data } = await axios.get(
        `https://639b09b0d51415019748e526.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=asc${search}`
    );
     
    return data
})

const initialState = {
    items: [],
    status: 'loading'
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers:  {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;