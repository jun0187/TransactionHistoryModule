import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { backgroundStyle } from "../../App";
import { NAVIGATION } from "../constant";
import { getTrxHistoryListAction } from "../saga/TrxHistory.saga";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { setTrxHistoryDetail } from "../reducer/TrxHistory.reducer";
import { authenticateBiometric } from "../services/Biometric.service";

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const pageNo = useRef(1);
  const [isMaskedAmount, setIsMaskedAmount] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const trxHistoryList = useSelector(
    (state: any) => state.trxHistory.trxHistoryList
  );

  const testId = {
    dropDown: "test-drop-down",
    sortButton: "test-sort-button",
    trxHistoryDetail: "test-trxHistory-detail",
    flatList: "test-flat-list",
  };

  useEffect(() => {
    if (refreshing && !trxHistoryList?.isLoading && !trxHistoryList?.isError) {
      setRefreshing(false);
    }
    if (trxHistoryList.isError) {
      Alert.alert(
        "Unable to retrieve history list. Please refresh to try again."
      );
    }
  }, [trxHistoryList]);

  const updateList = () => {
    if (!trxHistoryList || trxHistoryList.total_pages > pageNo.current) {
      dispatch(
        getTrxHistoryListAction({
          page: pageNo.current,
        })
      );
    }
  };

  const onEndReached = () => {
    if (
      !trxHistoryList ||
      trxHistoryList.isError ||
      trxHistoryList.isLoading ||
      trxHistoryList.page === trxHistoryList.total_pages
    ) {
      return;
    }
    pageNo.current += 1;
    updateList();
  };

  const onPressMaskedAmountIcon = async () => {
    if (!isMaskedAmount) {
      /* When is Visible, can masked amount directly without authentication */
      setIsMaskedAmount(!isMaskedAmount);
    } else {
      /* When is Masked, need authentication to reveal the amount */
      const isAuth = await authenticateBiometric();
      if (isAuth) setIsMaskedAmount(!isMaskedAmount);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <FlatList
        testID={testId.flatList}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          pageNo.current = 1;
          updateList();
        }}
        data={trxHistoryList?.results}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.id}
              testID={`${testId.trxHistoryDetail}-${index}`}
              style={styles.listingContainer}
              onPress={() => {
                dispatch(setTrxHistoryDetail(item));
                navigation.navigate(NAVIGATION.DETAIL);
              }}
            >
              <View style={styles.detailContainer}>
                <Text
                  style={{ fontWeight: "bold" }}
                  testID={`${testId.trxHistoryDetail}-${index}`}
                >
                  {item.description}
                </Text>
                <View style={styles.rightContainer}>
                  <Text>
                    MYR {isMaskedAmount ? "*****" : item.amount.toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    onPress={onPressMaskedAmountIcon}
                    style={{ marginLeft: "7%" }}
                  >
                    <EntypoIcon
                      name={isMaskedAmount ? "eye-with-line" : "eye"}
                      size={20}
                      color="#841777"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text>{item.type}</Text>
              <Text>{item.date}</Text>

              <View style={styles.horizontalLine} />
            </TouchableOpacity>
          );
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fontSizeStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "95%",
  },
  rightContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  listingContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: "7%",
    marginTop: "2%",
  },
  filterContainer: {
    marginHorizontal: "5%",
    marginTop: "2%",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row",
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginVertical: "3%",
  },
});
export default Home;
