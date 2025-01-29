import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  favouriteItems: [],
  favouriteTotalQuantity: 0,
  favouriteTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // add to favourite reducer
    addToFavourite(state, action) {
      const itemIndex = state.favouriteItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // Produkt istnieje w koszyku - zwiększ ilość
        state.favouriteItems[itemIndex].cartQuantity += action.payload.quantity;

        toast.info(
          `Zwiększono ilość: ${action.payload.name}, teraz w koszyku: ${state.cartItems[itemIndex].cartQuantity}`,
          {
            position: "bottom-left",
          }
        );
      } else {
        // Produkt nie istnieje w koszyku - dodaj nowy
        const tempProduct = {
          ...action.payload,
          cartQuantity: action.payload.quantity,
        };
        state.cartItems.push(tempProduct);

        toast.success(`Dodano do koszyka: ${action.payload.name}`, {
          position: "bottom-left",
        });
      }
    },

    // remove item reducer
    removeFromFavourite(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItems = nextCartItems;

      toast.error(`Usunięto z koszyka: ${action.payload.name}`, {
        position: "bottom-left",
      })
    },

    // clear favourite
    clearFavourite(state, action){
      state.cartItems = [];
      toast.error('Koszyk jest pusty', {
        position: "bottom-left",
      })
    },

  },
});

export const { addToCart, removeFromCart, clearCart } = favouriteSlice.actions;

export default favouriteSlice.reducer;