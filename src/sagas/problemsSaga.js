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
  yield put({ type : 'UI_LOADING',  payload : { loading : true }});
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(ProblematorAPI.deleteTick, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  // Pass these to reducer, because we need this data to change the state
  payload.tickid = action.payload.tickid;
  payload.problemid = action.payload.problemid;
  yield put({ type: 'DELETE_TICK_PUT', payload });
  // yield put({ type : 'UI_LOADING',  payload : { loading : false }});
}

function* doSaga(action, apiCall, successReducer, failReducer)  {
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
  if (payload && !payload.error) {
    payload.problemid = action.payload.problemid;
    // pass the original action payload to reducer.
    // The parameters might contain some handy data reducer can use
    payload.source = action.payload;
    yield put({ type: successReducer, payload });
  } else {
    yield put({ type: failReducer, payload });
  }
  // yield put({ type : 'UI_LOADING',  payload : { loading : false }});
}

export function* delBetaVideoSaga(action) {
  yield(doSaga(action, ProblematorAPI.delBetaVideo,'DEL_BETAVIDEO_PUT'));
}

export function* saveTickSaga(action) {
  yield(doSaga(action, ProblematorAPI.saveTick,'SAVE_TICK_PUT'));
}


export function* addBetaVideo(action) {
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(ProblematorAPI.addBetaVideo, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  console.log("addbetavideo",payload);
  if (payload.message && payload.message.match(/error/i)) {
    payload.error = true;
  }
  if (payload && !payload.error) {
    payload.problemid = action.payload.problemid;
    yield put({ type: 'ADD_BETAVIDEO_PUT', payload });
  } else {
    console.log("Error loading ascents",response);
    yield put({ type: 'PROBLEMS_LOAD_ERROR', payload });
  }
}


export function* getGlobalAscents(action) {
  console.log("got",action);
  const token = yield(select(authToken));
  action.payload = {...action.payload, token : token};
  const response = yield call(ProblematorAPI.getGlobalAscents, action.payload)
  let payload = response ? response.data : {}
  payload = fixJSONP(payload);
  console.log("saga return");
  if (payload && !payload.error) {
    payload.problemid = action.payload.problemid;
    console.log("before reducer",payload);
    yield put({ type: 'GLOBAL_ASCENTS_PUT', payload });
  } else {
    console.log("Error loading ascents",response);
    yield put({ type: 'PROBLEMS_LOAD_ERROR', payload });
  }
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
