import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
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
      if ( quantity>product.quantity) {
        
        toast.info("Product stock limit over.");
      }
      if (product && quantity<=product.quantity ) {
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



