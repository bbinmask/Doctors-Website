import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "./userInfo.slice";

export const medicareStore = configureStore({
  reducer: {
    user: userInfoSlice.reducer,
  },
});
