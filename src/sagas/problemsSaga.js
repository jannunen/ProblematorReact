import { select, call, put  } from 'redux-saga/effects';
import ProblematorAPI from "../apis/problematorapi";
export const authToken = (state) => state.auth.token;
import doSaga from './doSaga'

export function* getProblemSaga(action) {
  yield (doSaga(action, ProblematorAPI.getProblem, 'GET_PROBLEM_PUT',null, false ));
}

export function* deleteTickSaga(action) {
  yield (doSaga(action, ProblematorAPI.deleteTick, 'DELETE_TICK_PUT',null, true ));
}

export function* sendOpinionSaga(action) {
  yield (doSaga(action, ProblematorAPI.saveOpinion, 'SAVE_OPINION_PUT',null, true ));
}
export function* sendFeedbackSaga(action) {
  yield (doSaga(action, ProblematorAPI.saveFeedback, 'SAVE_FEEDBACK_PUT',null, true ));
}

export function* delBetaVideoSaga(action) {
  yield(doSaga(action, ProblematorAPI.delBetaVideo,'DEL_BETAVIDEO_PUT'));
}

export function* saveTickSaga(action) {
  yield(doSaga(action, ProblematorAPI.saveTick,'SAVE_TICK_PUT'));
}


export function* addBetaVideoSaga(action) {
  yield(doSaga(action, ProblematorAPI.addBetaVideo,'ADD_BETAVIDEO_PUT'));
}

export function* getGlobalAscents(action) {
  yield(doSaga(action, ProblematorAPI.getGlobalAscents,'GLOBAL_ASCENTS_PUT'));
}

export function* getProblemsSaga(action) {
  yield(doSaga(action, ProblematorAPI.getProblems,'SET_PROBLEMS'));
}
