import { select, call, put  } from 'redux-saga/effects';
// import ProblematorAPI from "../apis/problematorapi";
//import fixJSONP from '../helpers/fixJSONP';
export const authToken = (state) => state.auth.token;

var  doSaga = function *(action, apiCall, successReducer, failReducer, alertSuccess)  {
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
  let payload =  response ? response.data : {}
  if (payload.message && payload.message.match(/error/i)) {
    payload['error']= true;
  }
  const newPayload = JSON.parse(JSON.stringify(payload));
  let ret = true;
  if (newPayload && !newPayload.error) {
    // pass the original action payload to reducer.
    // The parameters might contain some handy data reducer can use
    /*
    if (alertSuccess) {
      console.log("Trying to alert",payload);
      yield put({ type : 'ALERT_MESSAGE', payload});
    }
    */
    yield put({ type: successReducer, payload : newPayload });
  } else {
    yield put({ type: failReducer,payload : newPayload });
    ret = false;
  }
  yield put({ type : 'UI_LOADING',  payload : { uiState : 'ready' }});
  return ret;
}
export default doSaga;