import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
  };

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {  
         addProduct: (state, action) => {
        state.products.push();
      }, 
      removeProduct: (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      },
   },
});

export const { addProduct,removeProduct } = cartSlice.actions;

export default cartSlice.reducer;