import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import { groupSaga } from '../../sagas/groupSaga'
import { groupDetails } from '../fixtures/groups'


it('just works!', () => {
  const state = {
    auth : {
      token : 'foo',
    }
  }
  // Make sure that the api returns what we want

  let originalData = JSON.parse(JSON.stringify(groupDetails));
  sinon.stub(api, "group").returns({data : JSON.stringify(groupDetails)});
  const action = {
    type : 'GROUP_SAGA',
    groupid : 6,
  }
  const expected = {
    ...originalData,
    problemid : undefined,
    source : {...state}
  }

  return expectSaga(groupSaga, action, api)
    //.withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'GROUP_PUT', expected})
    .run();
});