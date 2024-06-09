import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { backgroundStyle } from "../../App";
import {
  BIOMETRIC_TYPE,
  DeviceHeight,
  DeviceWidth,
  NAVIGATION,
} from "../constant";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TouchID from "react-native-touch-id";
import {
  authenticateBiometric,
  optionalConfigObject,
} from "../services/Biometric.service";
import { useDispatch, useSelector } from "react-redux";
import { getTrxHistoryListAction } from "../saga/TrxHistory.saga";

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const styles = useStyle();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const biometryType = useSelector((state: any) => state.login.biometryType);

  useEffect(() => {
    if (isAuth) {
      dispatch(
        getTrxHistoryListAction({
          page: 1,
        })
      );
      navigation.navigate(NAVIGATION.HOME);
    }
  }, [isAuth]);

  const onPressAuth = async () => {
    setIsAuth(await authenticateBiometric());
  };

  const iconName = () => {
    if (biometryType === BIOMETRIC_TYPE.FACE_ID) return "face-recognition";
    else return "fingerprint";
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.listingContainer}>
        <Text style={styles.welcome}>Welcome</Text>
        <TouchableOpacity onPress={onPressAuth} style={{ marginLeft: "7%" }}>
          {biometryType !== null && <Icon name={iconName()} size={40} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const useStyle = (deviceWidth = DeviceWidth, deviceHeight = DeviceHeight) =>
  StyleSheet.create({
    listingContainer: {
      position: "absolute",
      top: deviceHeight * 0.25,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    welcome: {
      fontSize: 30,
      fontWeight: "bold",
      fontFamily: "Cochin",
    },
  });
export default Login;
