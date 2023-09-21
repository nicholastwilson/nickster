import { createSlice } from "@reduxjs/toolkit";

import * as Auth from "features/auth/Auth";

export const profileSlice = createSlice({
    name: "profile",
    initialState: Auth.getNicksterProfile() || {},
    reducers: {
        setProfile: (state, action) => {
            Object.assign(state, action.payload);
            Auth.setNicksterProfile(action.payload);
        },
    },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;