import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shouldScroll: true,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setShouldScroll(state, action) {
      state.shouldScroll = action.payload;
    },
  },
});

export const { setShouldScroll } = scrollSlice.actions;
export default scrollSlice.reducer;
