import TouchID from "react-native-touch-id";
import { BIOMETRIC_TYPE } from "../constant";
import { setBiometricType } from "../reducer/Login.reducer";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";

export const optionalConfigObject = {
  title: "Authentication Required", // Android
  imageColor: "#e00606", // Android
  imageErrorColor: "#ff0000", // Android
  sensorDescription: "Touch sensor", // Android
  sensorErrorDescription: "Failed", // Android
  cancelText: "Cancel", // Android
  fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

export const getBiometricType = async () => {
  return await TouchID.isSupported(optionalConfigObject)
    .then((biometryType) => {
      return biometryType;
    })
    .catch((error) => {
      Alert.alert("Error::", error);
      return null;
    });
};

export const authenticateBiometric = async () => {
  return await TouchID.authenticate("Authentication", optionalConfigObject)
    .then((success: any) => {
      return success;
    })
    .catch((error: any) => {
      Alert.alert("Error::", error);
      return false;
    });
};
