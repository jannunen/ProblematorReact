import { select, call, put  } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
import fixJSONP from '../helpers/fixJSONP';
export const authToken = (state) => state.auth.token;

export function* getProblemSaga(action) {
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(ProblematorAPI.getProblem, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  yield put({ type: 'GET_PROBLEM_PUT', payload });
}

export function* deleteTickSaga(action) {
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(ProblematorAPI.deleteTick, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  // Pass these to reducer, because we need this data to change the state
  payload.tickid = action.payload.tickid;
  payload.problemid = action.payload.problemid;
  yield put({ type: 'DELETE_TICK_PUT', payload });
}


export function* getProblemsSaga(action) {
  const token = yield(select(authToken));
  action.payload = {token : token};
  const response = yield call(ProblematorAPI.getProblems, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  if (payload && !payload.error) {
    yield put({ type: 'SET_PROBLEMS', payload });
  } else {
    console.log("Error loading problems",response);
    yield put({ type: 'PROBLEMS_LOAD_ERROR', payload });
  }

}
