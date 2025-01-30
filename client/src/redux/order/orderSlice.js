import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  deliveryMethod: null,
  paymentMethod: null,
  totalPrice: 0,
};

const calculateTotalPrice = (cartItems, deliveryMethod) => {
  const cartTotal = cartItems.reduce((sum, item) => {
    const priceToUse = item.discountedPrice || item.price;
    return sum + priceToUse * item.cartQuantity;
  }, 0);
  const deliveryCost = deliveryMethod ? deliveryMethod.price : 0;
  return cartTotal + deliveryCost;
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalPrice = calculateTotalPrice(state.cartItems, state.deliveryMethod);
    },
    updateDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
      state.totalPrice = calculateTotalPrice(state.cartItems, state.deliveryMethod);
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
