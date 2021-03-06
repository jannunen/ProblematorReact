import { takeLatest, put, fork, takeEvery } from 'redux-saga/effects';
import { getAuthSaga } from './authSaga';
import * as problemSagas from './problemsSaga';
import  * as uiSagas from './uiSaga'
import  * as groupSagas from './groupSaga'
import  * as compSagas from './compSaga'

export default function *rootSaga() {

  yield [
    fork( takeLatest, 'GET_PROBLEM_SAGA',problemSagas.getProblemSaga ),
    fork( takeLatest, 'GET_PROBLEMS_SAGA',problemSagas.getProblemsSaga ),
    fork( takeLatest, 'DELETE_TICK_SAGA',problemSagas.deleteTickSaga ),
    fork( takeLatest, 'GET_GLOBAL_ASCENTS',problemSagas.getGlobalAscents ),
    fork( takeLatest, 'ADD_BETAVIDEO_SAGA',problemSagas.addBetaVideoSaga ),
    fork( takeLatest, 'DEL_BETAVIDEO_SAGA',problemSagas.delBetaVideoSaga ),
    fork( takeLatest, 'SAVE_TICK_SAGA', problemSagas.saveTickSaga ),
    fork( takeLatest, 'SEND_FEEDBACK_SAGA', problemSagas.sendFeedbackSaga ),
    fork( takeLatest, 'SEND_OPINION_SAGA', problemSagas.sendOpinionSaga ),
    fork( takeLatest, 'MY_GROUPS_SAGA', groupSagas.myGroupsSaga ),
    fork( takeLatest, 'DELETE_GROUP_MEMBER_SAGA', groupSagas.deleteGroupMemberSaga ),
    fork( takeLatest, 'SEND_INVITATIONS_SAGA', groupSagas.sendInvitationsSaga ),
    fork( takeLatest, 'ACCEPT_GROUP_INVITATION_SAGA', groupSagas.acceptGroupInvitationSaga ),
    fork( takeLatest, 'DECLINE_GROUP_INVITATION_SAGA', groupSagas.declineGroupInvitationSaga ),
    fork( takeLatest, 'SAVE_GROUP_SAGA', groupSagas.saveGroupSaga ),
    fork( takeEvery, 'SET_GROUP_TO_FIND_SAGA', groupSagas.setGroupToFind ),
    fork( takeLatest, 'GROUP_SAGA', groupSagas.groupSaga ),
    fork( takeLatest, 'GET_AUTH_SAGA',getAuthSaga ),
    fork( takeLatest, 'SEARCH_GROUPS_SAGA',groupSagas.searchGroupsSaga ),
    fork( takeLatest, 'JOIN_GROUP_SAGA',groupSagas.joinGroupSaga ),
    fork( takeLatest, 'MY_COMPS_SAGA',compSagas.myCompsSaga ),
    takeEvery('PROBLEMS_LOAD_ERROR', uiSagas.showErrorAlert),
    takeEvery('ALERT_MESSAGE', uiSagas.showAlert),
  ]
};