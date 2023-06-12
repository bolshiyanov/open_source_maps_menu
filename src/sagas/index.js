import { all } from 'redux-saga/effects';

import config from './config';

export default function* rootSaga() {
  yield all([
    config()
  ]);
}
