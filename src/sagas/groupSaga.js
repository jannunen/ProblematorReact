import { select, call, put  } from 'redux-saga/effects';
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
