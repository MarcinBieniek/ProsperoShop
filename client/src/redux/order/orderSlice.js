import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  deliveryMethod: null,
  paymentMethod: null,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    updateDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
      state.totalPrice = state.cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0) + action.payload.price;
    },
    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    createOrder: (state) => {
      console.log("Zamówienie utworzone:", state);
    },
  },
});

export const {
  updateCartItems,
  updateDeliveryMethod,
  updatePaymentMethod,
  createOrder
} = orderSlice.actions;

export default orderSlice.reducer;
