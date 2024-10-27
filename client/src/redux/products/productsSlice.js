import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get("http://localhost:3000/api/product/get");
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    // Delete
    deleteProductStart: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      const productId = action.payload; // ID usuniętego produktu jest teraz w payload
      state.items = state.items.filter(product => product._id !== productId); // Usuwamy produkt po ID
      state.loading = false;
      state.error = null;
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const {

  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,

} = productsSlice.actions;

export default productsSlice.reducer;
