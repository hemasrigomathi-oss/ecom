import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import addressReducer from "./addressSlice";

const loadState = () => {
  try {
    const savedState = localStorage.getItem("reduxState");

    if (savedState === null) {
      return undefined;
    }

    return JSON.parse(savedState);
  } catch (error) {
    console.error("Could not load state:", error);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    addresses: addressReducer,
  },

  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();

    const stateToSave = {
      cart: state.cart,
      orders: state.orders,
      addresses: state.addresses,
    };

    localStorage.setItem(
      "reduxState",
      JSON.stringify(stateToSave)
    );
  } catch (error) {
    console.error("Could not save state:", error);
  }
});

export default store;