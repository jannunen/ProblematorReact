import { takeLatest, fork, call, put, takeEvery, all } from 'redux-saga/effects';
import { addBetaVideo, getGlobalAscents, getProblemSaga, getProblemsSaga , deleteTickSaga} from './problemsSaga'
import { getAuthSaga } from './authSaga';
import  * as uiSagas from './uiSaga'

export function* testSaga() {
    console.log('Wired up!');
    yield 'WIRED UP!'
  }

// export function *watchGetProblem() {
//     yield takeLatest("GET_PROBLEM_SAGA", getProblemSaga);
// }
// export function *watchGetProblems() {
//     yield takeLatest("GET_PROBLEMS_SAGA", getProblemsSaga);
// }

export default function *rootSaga() {
  yield [
    fork( takeLatest, 'GET_PROBLEM_SAGA',getProblemSaga ),
    fork( takeLatest, 'GET_PROBLEMS_SAGA',getProblemsSaga ),
    fork( takeLatest, 'GET_AUTH_SAGA',getAuthSaga ),
    fork( takeLatest, 'DELETE_TICK_SAGA',deleteTickSaga ),
    fork( takeLatest, 'GET_GLOBAL_ASCENTS',getGlobalAscents ),
    fork( takeLatest, 'ADD_BETAVIDEO_SAGA',addBetaVideo ),
    takeEvery('PROBLEMS_LOAD_ERROR', uiSagas.showErrorAlert)
  ]
};

/*

  export default function* rootSaga() {
    yield all([
        testSaga(),
      watchGetProblem(),
      watchGetProblems(),
    ]);
  }
  */