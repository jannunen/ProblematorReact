import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import { groupSaga } from '../../sagas/groupSaga'
import { groupDetails } from '../fixtures/groups'


it('Should execute group saga correctly', () => {
  const state = {
    auth : {
      token : 'foo',
    }
  }
  // Make sure that the api returns what we want

  const groupDetails2 = { 'id' : 654, 'nimi' : 'foppa'};
  let originalData = JSON.parse(JSON.stringify(groupDetails2));
  sinon.stub(api, "group").returns({data : groupDetails2});
  const action = {
    type : 'GROUP_SAGA',
    payload : { groupid : 6},
  }
  const expected = {
    ...originalData,
    source : action.payload
  }

  return expectSaga(groupSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'GROUP_PUT',  payload : expected })
    .run();
});