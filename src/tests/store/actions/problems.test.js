import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getProblems, problemsLoadBegin, problemsLoadFailure, setProblems } from "../../../store/actions/problems";
import { PROBLEMS_START_LOADING, PROBLEMS_LOAD_ERROR, SET_PROBLEMS, SELECT_GYM } from "../../../store/actions/actionTypes";
import  problems  from '../../fixtures/problems';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


describe('Problems actions tests',() => {
    beforeEach(() => {
        fetch.resetMocks()
      })

it('creates a problemsLoadBegin action',() => {
    expect(problemsLoadBegin()).toEqual(
        {
            type : PROBLEMS_START_LOADING
        }
    )
})

it('creates problemsLoadFailure action',() => {
    expect(problemsLoadFailure('test error')).toEqual({ type : PROBLEMS_LOAD_ERROR, error : 'test error'})
})
it('creates setproblems action',() => {
    expect(setProblems(problems)).toEqual({ type : SET_PROBLEMS, problems : problems})
})

it('should handle getProblems success',() => {

    // Mock the api call with fixture data
    fetch.mockResponseOnce(JSON.stringify(problems));

    // Be sure to set the auth to initialstate
    const store = mockStore({auth : { token : 'test_token'}});

    const expectedActions = [
        { type: 'PROBLEMS_START_LOADING' },
        { type: 'SET_PROBLEMS', problems  }
    ];

    return store.dispatch(getProblems())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });



})


/*
it('should handle getProblems failure ', async () => {
    let store = mockStore({});
    await store.dispatch(getProblems())
    .catch((error) => {
      const errorObject = { ...error };
      delete errorObject.duration;
      expect(errorObject).toMatchSnapshot();
    });
  });
  */

});