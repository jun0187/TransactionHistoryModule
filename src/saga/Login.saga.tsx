import { createAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { getBiometricType } from "../services/Biometric.service";
import { setBiometricType } from "../reducer/Login.reducer";
import { BIOMETRIC_TYPE } from "../constant";
import { Alert } from "react-native";

export function* getBiometryType() {
  try {
    const bioType: BIOMETRIC_TYPE = yield call(getBiometricType);
    yield put(setBiometricType(bioType));
  } catch (e: any) {
    Alert.alert("Could not get biometry Type: ", e);
  }
}

export function* LoginSaga() {
  yield takeEvery(getBiometryTypeAction.type, getBiometryType);
}

export const getBiometryTypeAction: any = createAction("getBiometryTypeAction");
