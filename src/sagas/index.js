import { takeLatest, fork, call, put, takeEvery, all } from 'redux-saga/effects';
import { delBetaVideoSaga, addBetaVideo, getGlobalAscents, getProblemSaga, getProblemsSaga , deleteTickSaga} from './problemsSaga'
import { getAuthSaga } from './authSaga';
import  * as uiSagas from './uiSaga'

export default function *rootSaga() {
  yield [
    fork( takeLatest, 'GET_PROBLEM_SAGA',getProblemSaga ),
    fork( takeLatest, 'GET_PROBLEMS_SAGA',getProblemsSaga ),
    fork( takeLatest, 'GET_AUTH_SAGA',getAuthSaga ),
    fork( takeLatest, 'DELETE_TICK_SAGA',deleteTickSaga ),
    fork( takeLatest, 'GET_GLOBAL_ASCENTS',getGlobalAscents ),
    fork( takeLatest, 'ADD_BETAVIDEO_SAGA',addBetaVideo ),
    fork( takeLatest, 'DEL_BETAVIDEO_SAGA',delBetaVideoSaga ),
    takeEvery('PROBLEMS_LOAD_ERROR', uiSagas.showErrorAlert),
    takeEvery('ALERT_MESSAGE', uiSagas.showAlert)
  ]
};