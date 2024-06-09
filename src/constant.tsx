import { Dimensions } from "react-native";

export const DeviceWidth = Dimensions.get("window").width;
export const DeviceHeight = Dimensions.get("window").height;

export enum NAVIGATION {
  HOME = "TRANSACTION HISTORY",
  LOGIN = "LOGIN",
  DETAIL = "DETAIL",
}

export enum TRX_TYPE {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum BIOMETRIC_TYPE {
  FACE_ID = "FaceID",
  TOUCH_ID = "TouchID",
}
