import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: ' user', // 1st step is to set a name
  initialState, // 2nd step we pass initial state
  reducers: { // 3rd step we pass functions
    signInStart: (state) => { 
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;