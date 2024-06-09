import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { put, select, takeEvery } from "redux-saga/effects";
import { setTrxHistoryList } from "../reducer/TrxHistory.reducer";
// import axios from "axios";
import { TransactionListResModel } from "../interface";
import { transactionListResMock } from "../../__mocks__/trxHistory.mock";

export function* getTrxHistoryList(action: PayloadAction<{ page: number }>) {
  const { page } = action.payload;

  try {
    if (page === 1) {
      yield put(setTrxHistoryList(null));
    }

    const trxHistoryList: TransactionListResModel = yield select(
      (state) => state.trxHistory.trxHistoryList
    );

    yield put(
      setTrxHistoryList({ ...trxHistoryList, isLoading: true, isError: false })
    );

    /***To call API***/
    // const { data } = yield call(() => {
    //   return axios.get('API_LINK', {
    //     params: {
    //       page: page,
    //     },
    //   });
    // });

    const data = transactionListResMock(page);

    yield put(
      setTrxHistoryList({
        ...data,
        isLoading: false,
        results: trxHistoryList?.results
          ? [...trxHistoryList?.results, ...data.results]
          : data.results,
      })
    );
  } catch (e) {
    const trxHistoryList: TransactionListResModel = yield select(
      (state) => state.trxHistory.trxHistoryList
    );
    yield put(
      setTrxHistoryList({ ...trxHistoryList, isLoading: false, isError: true })
    );
  }
}

export function* TrxHistorySaga() {
  yield takeEvery(getTrxHistoryListAction.type, getTrxHistoryList);
}

export const getTrxHistoryListAction: any = createAction<{
  page: number;
}>("getTrxHistoryListAction");
