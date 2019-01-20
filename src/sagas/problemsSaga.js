import { select, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
import fixJSONP from '../helpers/fixJSONP';
export const authToken = (state) => state.auth.token;

export function* getProblemSaga(action) {
  console.log("getProblemSaga");
  const response = yield call(ProblematorAPI.getProblem, action.payload)
  const payload = response ? response.data : {}
  yield put({ type: 'GET_PROBLEM_PUT', payload });
  //action.callbackSuccess();
}


export function* getProblemsSaga(action) {
  console.log("getProblemsSaga");
  const token = yield(select(authToken));
  console.log("token: ",token);
  const response = yield call(ProblematorAPI.getProblems, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  console.log("payload",payload);
  if (payload && !payload.error) {
    yield put({ type: 'SET_PROBLEMS', payload });
  } else {
    console.log("Error loading problems",response);
    yield put({ type: 'PROBLEMS_LOAD_ERROR', payload });
  }

}
