import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BIOMETRIC_TYPE } from "../constant";

export interface LoginState {
  biometryType: BIOMETRIC_TYPE | null;
}

const initialState: LoginState = {
  biometryType: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setBiometricType: (state, action: PayloadAction<BIOMETRIC_TYPE | null>) => {
      state.biometryType = action.payload;
    },
  },
});

export const { setBiometricType } = loginSlice.actions;

export default loginSlice.reducer;
