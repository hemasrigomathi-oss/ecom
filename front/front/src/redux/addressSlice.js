import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: "addresses",
  initialState,

  reducers: {
    addAddress: (state, action) => {
      state.addresses.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateAddress: (state, action) => {
      const { id, updatedAddress } = action.payload;

      const address = state.addresses.find(
        (item) => item.id === id
      );

      if (address) {
        Object.assign(address, updatedAddress);
      }
    },

    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addAddress,
  updateAddress,
  deleteAddress,
} = addressSlice.actions;

export default addressSlice.reducer;