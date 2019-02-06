import { call, put, take } from 'redux-saga/effects';
import sinon from 'sinon';
import api from '../../apis/problematorapi'
import { expectSaga } from 'redux-saga-test-plan';
import  * as compSagas  from '../../sagas/compSaga'
import {  myCompsAnswer} from '../fixtures/comps'

  const state = {
    auth : {
      token : 'foo',
    }
  }
  describe('comp saga tests',() => {
      it('should execute my competitions saga', () => {
          let originalData = JSON.parse(JSON.stringify(myCompsAnswer));
          sinon.stub(api, "myCompetitions").returns({ data: myCompsAnswer });
          const action = {
              type: 'MY_COMPS_SAGA',
          }
          const expected = { ...myCompsAnswer };
          return expectSaga(compSagas.myCompsSaga, action, api)
              .withState(state)
              .put({ type: 'UI_LOADING', payload: { uiState: 'loading' } })
              .put({ type: 'MY_COMPS_PUT', payload: expected })
              .put({ type: 'UI_LOADING', payload: { uiState: 'ready' } })
              .run();
      })

    });