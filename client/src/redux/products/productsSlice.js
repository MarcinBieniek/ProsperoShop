import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}
});

export default productsSlice.reducer;