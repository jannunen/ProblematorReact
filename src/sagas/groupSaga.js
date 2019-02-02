import ProblematorAPI from "../apis/problematorapi";
import doSaga from './doSaga'

export function* myGroupsSaga(action) {
  yield (doSaga(action, ProblematorAPI.myGroups, 'MY_GROUPS_PUT'))
}
export function* groupSaga(action,api) {
  yield (doSaga(action, ProblematorAPI.group, 'GROUP_PUT', null, null ))
}
export function* deleteGroupMemberSaga(action,api) {
  yield (doSaga(action, ProblematorAPI.removeUserFromGroup, 'DELETE_GROUP_MEMBER_PUT',null))
}
export function* sendInvitationsSaga(action,api) {
  yield (doSaga(action, ProblematorAPI.sendInvitations, 'SEND_INVITATIONS_PUT',null))
}
export function* saveGroupSaga(action,api) {
  yield (doSaga(action, ProblematorAPI.saveGroupSettings, 'SAVE_GROUP_PUT',null,true))
}
export function* acceptGroupInvitationSaga(action) {
  yield (doSaga(action, ProblematorAPI.acceptGroupInvitation, 'ACCEPT_INVITATION_PUT',null,true))
}
export function* declineGroupInvitationSaga(action) {
  yield (doSaga(action, ProblematorAPI.declineGroupInvitation, 'DECLINE_INVITATION_PUT',null,true))
}
