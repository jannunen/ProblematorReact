import { problemsLoadBegin, problemsLoadFailure, setProblems } from "../../../store/actions/problems";
import { PROBLEMS_START_LOADING, PROBLEMS_LOAD_ERROR, SET_PROBLEMS, SELECT_GYM } from "../../../store/actions/actionTypes";
import { problems } from '../../fixtures/problems';

describe('Problems actions tests',() => {

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

});