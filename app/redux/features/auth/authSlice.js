"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: null,
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
