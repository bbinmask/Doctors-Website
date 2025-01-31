import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
  },
  name: "user",
  reducers: {
    setUserInfo: (state, action) => {
      const { role, token } = action.payload;
      const user = action.payload.data;
      if (!user || !role || !token) {
        return state;
      }

      state.user = user;
      state.role = role;
      state.token = token;
      return state;
    },
    resetUserInfo: (state, action) => {
      state.role = null;
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;
