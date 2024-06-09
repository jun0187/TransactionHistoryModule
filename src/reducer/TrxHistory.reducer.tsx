import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  TransactionDataModel,
  TransactionListResModel,
} from "../interface";

export interface TrxHistoryState {
  trxHistoryList: TransactionListResModel | null;
  trxHistoryDetail: TransactionDataModel | null;
}

const initialState: TrxHistoryState = {
  trxHistoryList: null,
  trxHistoryDetail: null,
};

export const trxHistorySlice = createSlice({
  name: "trxHistory",
  initialState,
  reducers: {
    setTrxHistoryList: (
      state,
      action: PayloadAction<TransactionListResModel | null>
    ) => {
      state.trxHistoryList = action.payload;
    },
    setTrxHistoryDetail: (
      state,
      action: PayloadAction<TransactionDataModel | null>
    ) => {
      state.trxHistoryDetail = action.payload;
    },
  },
});

export const { setTrxHistoryList, setTrxHistoryDetail } =
  trxHistorySlice.actions;

export default trxHistorySlice.reducer;
