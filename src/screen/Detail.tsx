import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { backgroundStyle } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TRX_TYPE } from "../constant";
import { StyleProp } from "react-native";

const Detail = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const trxHistoryDetail = useSelector(
    (state: any) => state.trxHistory.trxHistoryDetail
  );

  const testID = {
    container: "test-detail-container",
    bookBtn: "test-book-btn",
  };

  const amountStyle = (): StyleProp<TextStyle> => {
    let color = "black";
    if (trxHistoryDetail.type === TRX_TYPE.CREDIT) {
      color = "red";
    } else if (trxHistoryDetail.type === TRX_TYPE.DEBIT) {
      color = "green";
    }
    return { color: color, fontSize: 19 };
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View
        style={styles.container}
        testID={testID.container}
        key={trxHistoryDetail.id}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.typeStyle}>
            {trxHistoryDetail.type.toUpperCase()}
          </Text>
          <Text style={amountStyle()}>
            {trxHistoryDetail.type === TRX_TYPE.CREDIT ? "-" : ""} MYR{" "}
            {trxHistoryDetail.amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.innerContainer}>
          <Text style={styles.defaultFontSize}>Description</Text>
          <Text style={styles.defaultFontSize}>
            {trxHistoryDetail.description}
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.defaultFontSize}>Date</Text>
          <Text style={styles.defaultFontSize}>{trxHistoryDetail.date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "90%",
  },
  typeStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginTop: "3%",
    marginBottom: "10%",
  },
  defaultFontSize: {
    fontSize: 15,
  },
});
export default Detail;
