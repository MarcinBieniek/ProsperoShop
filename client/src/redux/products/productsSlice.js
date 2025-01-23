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

export const productFetch = createAsyncThunk(
  "products/productFetch",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/api/product/get/${id}`);
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
      const productId = action.payload;
      state.items = state.items.filter(product => product._id !== productId);
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

      // pobieramy wszystkie produkty
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state) => {
        state.status = "rejected";
      })

      // pobieramy jeden produkt
      .addCase(productFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(productFetch.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch product";
      });
  },
});

export const {

  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,

} = productsSlice.actions;

export default productsSlice.reducer;
