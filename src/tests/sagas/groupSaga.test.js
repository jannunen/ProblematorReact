import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import  * as groupSagas  from '../../sagas/groupSaga'
import { groupDetails } from '../fixtures/groups'

  const state = {
    auth : {
      token : 'foo',
    }
  }

it('should execute send invitations sage',() => {
  const messageFromApi = {"error":false,"message":"Invitation(s) sent."};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "sendInvitations").returns({data : messageFromApi});
  const action = {
    type : 'SEND_INVITATIONS_SAGA',
    payload : { },
  }
  const expected = {
    ...originalData,
    //source : action.payload
  }

  return expectSaga(groupSagas.deleteGroupMemberSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'DELETE_GROUP_MEMBER_PUT',  payload : expected })
    .run();
})

it('should execute remove user from groups saga correctly',() => {
  const messageFromApi = {"error":false,"message":"User removed from the group"};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "removeUserFromGroup").returns({data : messageFromApi});
  const action = {
    type : 'DELETE_GROUP_MEMBER_SAGA',
    payload : { uid: 3552,gid : 6},
  }
  const expected = {
    ...originalData,
    //source : action.payload
  }

  return expectSaga(groupSagas.deleteGroupMemberSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'DELETE_GROUP_MEMBER_PUT',  payload : expected })
    .run();
})

it('Should execute group saga correctly', () => {
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
    //source : action.payload
  }

  return expectSaga(groupSagas.groupSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'GROUP_PUT',  payload : expected })
    .put({type : 'UI_LOADING', payload : {uiState : 'ready'}})
    .run();
});