import { select, call, put  } from 'redux-saga/effects';
// import ProblematorAPI from "../apis/problematorapi";
//import fixJSONP from '../helpers/fixJSONP';
export const authToken = (state) => state.auth.token;

var  doSaga = function *(action, apiCall, successReducer, failReducer, alertSuccess,customApi)  {
  if (action.payload == null) {
    action.payload = {};
  }
  yield put({ type : 'UI_LOADING',  payload : { uiState : 'loading' }});
  if (failReducer == null) {
    failReducer = 'PROBLEMS_LOAD_ERROR';
  }
  if (alertSuccess == null) {
    alertSuccess = false;
  }
  const response = yield call(apiCall, action.payload)
  let payload = response ? response.data : {}
  /*
  if ("string"===typeof(payload)) {
    payload = {message : payload};
  }
  */
  if (payload.message && payload.message.match(/error/i)) {
    payload.error = true;
  }
  let ret = true;
  if (payload && !payload.error) {
    // pass the original action payload to reducer.
    // The parameters might contain some handy data reducer can use
    payload.source = action.payload;
    if (alertSuccess) {
      yield put({ type : 'ALERT_MESSAGE', payload});
    }
    yield put({ type: successReducer, payload });
  } else {
    yield put({ type: failReducer, payload });
    ret = false;
  }
  return ret;
}
export default doSaga;