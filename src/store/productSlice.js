import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCodes from "../utils/StatusCodes";

const initialState = {
    data: [],
    status: "idle"
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // fetchProducts(state, action) {
        //     return { ...state, data: action.payload };
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state, action) => {
            state.status = StatusCodes.LOADING;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = StatusCodes.IDLE;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.status = StatusCodes.LOADING;
        })
    }
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
});

// export function getProducts() {
//     return async function getProductsThunk(dispatch, getState) {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();
//         dispatch(fetchProducts(data));
//     } 
// }