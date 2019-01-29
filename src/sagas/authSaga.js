import { AsyncStorage } from 'react-native';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

export function* getAuthSaga(action) {
  const { token,uid } = action.payload;
  const payload = action.payload;
  AsyncStorage.setItem("problemator:auth:token", token);
  AsyncStorage.setItem("problemator:auth:uid", uid+"");
  yield put({ type: 'AUTH_SET_TOKEN', payload });
}