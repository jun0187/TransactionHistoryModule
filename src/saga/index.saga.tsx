import { all } from "redux-saga/effects";
import { TrxHistorySaga } from "./TrxHistory.saga";
import { LoginSaga } from "./Login.saga";

function* rootSaga() {
  yield all([TrxHistorySaga(), LoginSaga()]);
}

export default rootSaga;
