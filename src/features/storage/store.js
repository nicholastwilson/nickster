import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "features/auth/profileSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
  },
});