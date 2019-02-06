import { select, call, put  } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
import doSaga from './doSaga'

export function* myCompsSaga(action) {
  yield (doSaga(action, ProblematorAPI.myCompetitions, 'MY_COMPS_PUT'))
}