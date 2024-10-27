import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  allUsers: [],
  currentUser: null,
  error: null,
  loading: false
}

export const usersFetch = createAsyncThunk(
  "user/usersFetch",
  async () => {
    const response = await axios.get("http://localhost:3000/api/user/all");
    return response?.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sign in
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
    },

    // Update
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      const userId = action.payload; // ID usuniętego użytkownika jest teraz w payload
      state.allUsers = state.allUsers.filter(user => user._id !== userId); // Usuwamy użytkownika po ID
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Logout
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(usersFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.allUsers = action.payload;
      })
      .addCase(usersFetch.rejected, (state) => {
        state.status = "rejected";
      });
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} = userSlice.actions;

export default userSlice.reducer;
