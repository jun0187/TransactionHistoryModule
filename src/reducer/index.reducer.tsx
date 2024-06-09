import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "./Login.reducer";
import TrxHistoryReducer from "./TrxHistory.reducer";

export const combinedReducers = combineReducers({
  trxHistory: TrxHistoryReducer,
  login: LoginReducer,
});
