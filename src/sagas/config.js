import { takeEvery, put, call } from 'redux-saga/effects';

import {
  CONFIG_LOAD,
  LOADING_ERROR,
  SET_DATA,
  SAVE_DATA,
  DATA_ALREADY_SAVED,
  REGISTER_USER,
  USER_REGISTERED,
  EDIT_BLOCK,
  EDIT_STORY,
  EDIT_AD,
  IMAGE_UPLOADED
} from 'constants/actions';

import API from 'utils/api';
// import mockData from 'mocks/data.json';

function* loadConfig() {
  try {
    const mockData = yield call(API.getData, {});
    const {
      themes,
      buttonColors,
      backgrounds,
      config,
      account,
      ...data
    } = mockData;

    yield put({
      type: SET_DATA,
      themes,
      buttonColors,
      backgrounds,
      config,
      account,
      data
    });
  }
  catch (error) {
    yield put({ type: LOADING_ERROR, error });
  }
}

function* saveData({ data }) {
  try {
    yield call(API.saveData, data);
    yield put({
      type: DATA_ALREADY_SAVED
    });
  }
  catch (error) {
    yield put({ type: LOADING_ERROR, error });
  }
}

function* registerUser({ email, password }) {
  try {
    yield call(API.register, { email, password });
    yield put({
      type: USER_REGISTERED,
      email
    });
  }
  catch {
    yield put({
      type: USER_REGISTERED
    });
  }
}

function* storeImage({ payload }){
  try {
    if (payload?.image?.startsWith('data:image')) {
      const response = yield call(API.uploadImage, { image: payload.image });
      if (response?.imageUrl) {
        yield put({
          type: IMAGE_UPLOADED,
          guid: payload.guid,
          image: response.imageUrl
        });
      }
    }
  }
  catch (error) {
    console.log(error);
  }
}

export default function* configure() {
  yield takeEvery(CONFIG_LOAD, loadConfig);
  yield takeEvery(SAVE_DATA, saveData);
  yield takeEvery(REGISTER_USER, registerUser);
  yield takeEvery(EDIT_BLOCK, storeImage);
  yield takeEvery(EDIT_STORY, storeImage);
  yield takeEvery(EDIT_AD, storeImage);
}
