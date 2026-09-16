import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // Already exists → increase quantity
        existingProduct.quantity += 1;
      } else {
        // New product → quantity 1
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // Increase quantity
    increaseQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (product) {
        product.quantity += 1;
      }
    },

    // Decrease quantity
    decreaseQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) => item.id === action.payload
      );

      if (product) {
        product.quantity -= 1;

        // Quantity becomes 0 → remove product
        if (product.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },

    // Remove product directly
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear entire cart after successful order
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;