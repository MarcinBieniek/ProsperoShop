import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart reducer
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if(itemIndex >= 0){
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Zwiększono ilość ${action.payload.name}`, {
          position: "bottom-left",
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1}
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} został dodany do koszyka`, {
          position: "bottom-left",
        })
      }
    },
    // remove item reducer
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItems = nextCartItems;

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      })
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;