import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import  * as groupSagas  from '../../sagas/groupSaga'
import groups, { groupDetails } from '../fixtures/groups'

  const state = {
    auth : {
      token : 'foo',
    }
  }
it('should execute join group saga',() => {
  const messageFromApi = {"error":false,"message":"Group joined"};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "joinGroup").returns({data : messageFromApi});
  const action = {
    type : 'JOIN_GROUP_SAGA',
    payload : {
      groupid : 6,
     },
  }
  const expected = {...messageFromApi};
  return expectSaga(groupSagas.joinGroupSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
     .put({type : 'ALERT_MESSAGE', payload : messageFromApi})
     .put({type : 'JOIN_GROUP_PUT',  payload : expected })
     .put({type : 'UI_LOADING', payload : {uiState : 'ready'}})
    .run();
})


it('should execute group search saga',() => {
  const messageFromApi = groups.groups;
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "searchGroups").returns({data : messageFromApi});
  const action = {
    type : 'SEARCH_GROUPS_SAGA',
    payload : {
      term : 'test'
     },
  }
  const expected = JSON.parse(JSON.stringify(groups.groups));
  return expectSaga(groupSagas.searchGroupsSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
     .put({type : 'SEARCH_GROUPS_PUT',  payload : expected })
     .put({type : 'UI_LOADING', payload : {uiState : 'ready'}})
    .run();
})


it('should execute invitation decline FAIL saga',() => {
  const messageFromApi = {"error":true,"message":"Invitation decline failed."};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "declineGroupInvitation").returns({data : messageFromApi});
  const action = {
    type : 'DECLINE_GROUP_INVITATION_SAGA',
    payload : {
     },
  }
  const expected = {
    ...originalData,
  }
  return expectSaga(groupSagas.declineGroupInvitationSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
     .put({type : 'PROBLEMS_LOAD_ERROR',  payload : expected })
    .put({type : 'UI_LOADING', payload : {uiState : 'ready'}})
    .run();
})

it('should execute access invitation decline saga',() => {
  const messageFromApi = {"error":false,"message":"Invitation accepted"};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "declineGroupInvitation").returns({data : messageFromApi});
  const action = {
    type : 'DECLINE_GROUP_INVITATION_SAGA',
    payload : {
     },
  }
  const expected = {
    ...originalData,
  }
  return expectSaga(groupSagas.declineGroupInvitationSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
     .put({type : 'DECLINE_INVITATION_PUT',  payload : expected })
     .put({type : 'ALERT_MESSAGE',  payload : expected })
    .run();
})


it('should execute access invitation success saga',() => {
  const messageFromApi = {"error":false,"message":"Invitation accepted"};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "acceptGroupInvitation").returns({data : messageFromApi});
  const action = {
    type : 'ACCEPT_GROUP_INVITATION_SAGA',
    payload : {
     },
  }
  const expected = {
    ...originalData,
  }
  return expectSaga(groupSagas.acceptGroupInvitationSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
     .put({type : 'ACCEPT_INVITATION_PUT',  payload : expected })
     .put({type : 'ALERT_MESSAGE',  payload : expected })
    .run();
})


it('should execute save group success saga',() => {
  const messageFromApi = {"error":false,"message":"Group saved."};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "saveGroupSettings").returns({data : messageFromApi});
  const action = {
    type : 'SAVE_GROUP_SAGA',
    payload : {
     },
  }
  const expected = {
    ...originalData,
  }
  return expectSaga(groupSagas.saveGroupSaga, action, api)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'SAVE_GROUP_PUT',  payload : expected })
    .run();
})

it('should execute send invitations success saga',() => {
  const messageFromApi = {"error":false,"message":"Invitation(s) sent."};
  let originalData = JSON.parse(JSON.stringify(messageFromApi));
  sinon.stub(api, "sendInvitations").returns({data : messageFromApi});
  const action = {
    type : 'SEND_INVITATIONS_SAGA',
    payload : { 
      'emails' : ['eka','toka']
    },
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