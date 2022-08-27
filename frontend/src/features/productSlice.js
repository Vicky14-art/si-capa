import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products : null,
    isError : false,
    isSuccess: false,
    isLoading: false,
    message:''
}

export const getProducts = createAsyncThunk("products/getProducts", async(_,thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5000/products");
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        reset:(state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        });
        builder.addCase(getProducts.rejected , (state, action) => {
            state.isLoading =false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const {reset} = productSlice.actions;
export default productSlice.reducer;