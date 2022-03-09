import { put, takeLatest, all } from 'redux-saga/effects';

export function* fetchCustomers() {
    const json = yield fetch('http://localhost:4000/db')
    .then(response => response.json());

  yield put({ type: "CUSTOMER_TRANSACTIONS_RECEIVED", customers: json.customers || [{ error: 'Error fetching customer records' }] });
  }

  function* actionWatcher() {
    yield takeLatest('FETCH_CUSTOMER_TRANSACTIONS', fetchCustomers)
  }

  export default function* rootSaga() {
    yield all([
      actionWatcher(),
    ]);
  }