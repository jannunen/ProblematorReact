import { AsyncStorage } from 'react-native';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
import fixJSONP from '../helpers/fixJSONP';
import {JWT_TOKEN } from '../../config';

export function* getAuthSaga(action) {
  console.log("in getAuthSaga");
  console.log("payload",action.payload);
  const token = action.payload;
  //const response = yield call(ProblematorAPI.aut, action.payload)
  //const payload = response ? response.data : {}
  AsyncStorage.setItem("problemator:auth:token", token);
  yield put({ type: 'AUTH_SET_TOKEN', token });
  //action.callbackSuccess();
}