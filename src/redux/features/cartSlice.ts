import { TProduct } from "@/interface/TProduct";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";


interface cartState {
  products: TProduct[];
}

const initialState: cartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        toast.success("Product quantity increased in the cart");
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        toast.success("Product added successfully to the cart");
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      toast.info("Product removed from the cart");
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((item) => item._id === productId);

      if (product ) {
        product.quantity = quantity;
        toast.info("Product quantity updated");
      }
    },
    clearCart: (state) => {
      state.products = [];
      toast.info("Cart cleared");
    },
  },
});

export const { addProduct, removeProduct, updateProductQuantity ,clearCart} = cartSlice.actions;

export default cartSlice.reducer;



