
function* doSaga(action, apiCall, successReducer, failReducer, alertSuccess)  {
  yield put({ type : 'UI_LOADING',  payload : { loading : true }});
  if (failReducer == null) {
    failReducer = 'PROBLEMS_LOAD_ERROR';
  }
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(apiCall, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  // If the return value is only a string, make it an object with
  // a message property.
  if ("string"===typeof(payload)) {
    payload = {message : payload};
  }
  if (payload.message && payload.message.match(/error/i)) {
    payload.error = true;
  }
  let ret = true;
  if (payload && !payload.error) {
    payload.problemid = action.payload.problemid;
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