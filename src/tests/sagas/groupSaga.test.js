import { call, put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { groupSaga } from '../../sagas/groupSaga'


it('just works!', () => {
  const state = {
    auth : {
      token : 'foo',
    }
  }
  const action = {
    groupid : 6
  }

  return expectSaga(groupSaga, action)
    .withState(state)
    .put({type : 'UI_LOADING', payload : {uiState : 'loading'}})
    .put({type : 'GROUP_PUT', payload : 'foo'})
    .run();
});