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

      if (itemIndex >= 0) {
        // Produkt istnieje w koszyku - zwiększ ilość o 1
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        // Produkt nie istnieje w koszyku - dodaj nowy z ilością 1
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);
      }
    },

    // remove item reducer
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItems = nextCartItems;

      toast.error(`Usunięto z koszyka: ${action.payload.name}`, {
        position: "bottom-left",
      })
    },

    // decrease item amound
    decreaseCart(state, action){
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem._id === action.payload._id
      )

      if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.info(`Zmieniono ilość: ${action.payload.name}`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1){

        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error(`Usunięto z koszyka: ${action.payload.name}`, {
          position: "bottom-left",
        })

      }
    },

    // clear cart
    clearCart(state, action){
      state.cartItems = [];
      toast.error('Koszyk jest pusty', {
        position: "bottom-left",
      })
    },

    // get total price
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, discountedPrice, cartQuantity } = cartItem;

          const itemPrice = discountedPrice ?? price;
          const itemTotal = itemPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;