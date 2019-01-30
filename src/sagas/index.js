import { takeLatest, fork, call, put, takeEvery, all } from 'redux-saga/effects';
import { getAuthSaga } from './authSaga';
import * as problemSagas from './problemsSaga';
import  * as uiSagas from './uiSaga'
import  * as groupSagas from './groupSaga'

export default function *rootSaga() {
  yield [
    fork( takeLatest, 'GET_PROBLEM_SAGA',problemSagas.getProblemSaga ),
    fork( takeLatest, 'GET_PROBLEMS_SAGA',problemSagas.getProblemsSaga ),
    fork( takeLatest, 'DELETE_TICK_SAGA',problemSagas.deleteTickSaga ),
    fork( takeLatest, 'GET_GLOBAL_ASCENTS',problemSagas.getGlobalAscents ),
    fork( takeLatest, 'ADD_BETAVIDEO_SAGA',problemSagas.addBetaVideo ),
    fork( takeLatest, 'DEL_BETAVIDEO_SAGA',problemSagas.delBetaVideoSaga ),
    fork( takeLatest, 'SAVE_TICK_SAGA', problemSagas.saveTickSaga ),
    fork( takeLatest, 'SEND_FEEDBACK_SAGA', problemSagas.sendFeedbackSaga ),
    fork( takeLatest, 'SEND_OPINION_SAGA', problemSagas.sendOpinionSaga ),
    fork( takeLatest, 'MY_GROUPS_SAGA', groupSagas.myGroupsSaga ),
    fork( takeLatest, 'GET_AUTH_SAGA',getAuthSaga ),
    takeEvery('PROBLEMS_LOAD_ERROR', uiSagas.showErrorAlert),
    takeEvery('ALERT_MESSAGE', uiSagas.showAlert),
  ]
};