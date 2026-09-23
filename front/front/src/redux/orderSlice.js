
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addOrder: (state, action) => {
      state.orders.push({
        orderId: action.payload.orderId,
        orderDate: action.payload.orderDate || new Date().toISOString(),
        orderStatus: action.payload.orderStatus || "Order Placed",

        payment: {
          method: action.payload.payment?.method || "Cash on Delivery",
          type: action.payload.payment?.type || "Postpaid",
          status: action.payload.payment?.status || "Pending",
          transactionId: action.payload.payment?.transactionId || "N/A",
        },

        customerDetails: {
          name: action.payload.customerDetails?.name || "",
          email: action.payload.customerDetails?.email || "",
          phone: action.payload.customerDetails?.phone || "",
          address: action.payload.customerDetails?.address || "",
          city: action.payload.customerDetails?.city || "",
          state: action.payload.customerDetails?.state || "",
          country: action.payload.customerDetails?.country || "",
          pincode: action.payload.customerDetails?.pincode || "",
        },

        products: action.payload.products || [],

        priceDetails: {
          subtotal: action.payload.priceDetails?.subtotal || 0,
          deliveryCharge:
            action.payload.priceDetails?.deliveryCharge || 0,
          discount: action.payload.priceDetails?.discount || 0,
          tax: action.payload.priceDetails?.tax || 0,
          totalAmount: action.payload.priceDetails?.totalAmount || 0,
        },
      });
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;