import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import  * as problemSagas  from '../../sagas/problemsSaga'
import problems from '../fixtures/problems';

const state = {
    auth : {
        token : 'foo',
    }
}


it('Should execute getProblemSaga correctly', () => {
  // Make sure that the api returns what we want

  let originalData = JSON.parse(JSON.stringify(problems));
  sinon.stub(api, "getProblem").returns({data : problems});
  const action = {
    type : 'GET_PROBLEM_SAGA',
  }
  const expected = {
    ...originalData,
    source : {}
  }

  return expectSaga(problemSagas.getProblemSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'GET_PROBLEM_PUT',  payload : expected })
    .run();
});