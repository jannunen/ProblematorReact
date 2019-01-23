import { takeLatest, fork, call, put, takeEvery, all } from 'redux-saga/effects';
import { getProblemSaga, getProblemsSaga , deleteTickSaga} from './problemsSaga'
import { getAuthSaga } from './authSaga'

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