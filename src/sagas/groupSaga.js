import { select, call, put  } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
import fixJSONP from '../helpers/fixJSONP';
import doSaga from './doSaga'
export const authToken = (state) => state.auth.token;



export function* myGroupsSaga(action) {
  yield (doSaga(action, ProblematorAPI.myGroups, 'MY_GROUPS_PUT'))
}
export function* groupSaga(action,api) {
  if (api == null) {
    api = ProblematorAPI;
  } 
  yield (doSaga(action, api.group, 'GROUP_PUT', null, null ))
}