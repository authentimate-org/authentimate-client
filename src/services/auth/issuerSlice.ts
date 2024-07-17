import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import issuerApi from "@/api/issuer/issuerApi";

interface User {
  isOnboarded: boolean;
  isEmailVerified: boolean;
}

const initialState: User = {
  isOnboarded: false,
  isEmailVerified: false,
};

const issuerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        isEmailVerified?: boolean;
        isOnboarded?: boolean;
      }>
    ) => {
      state.isEmailVerified =
        action.payload.isEmailVerified ?? state.isEmailVerified;
      state.isOnboarded = action.payload.isOnboarded ?? state.isOnboarded;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(issuerApi.endpoints.onboard.matchFulfilled, (state) => {
      state.isOnboarded = true;
    });
    builder.addMatcher(issuerApi.endpoints.fetchIssuer.matchFulfilled, (state, { payload }) => {
      state.isEmailVerified = payload.isEmailVerified;
      state.isOnboarded = payload.onboarding;
    });
  },
});

export const { setUser } = issuerSlice.actions;

export default issuerSlice.reducer;
