import problemsReducer, {initialState } from '../../../store/reducers/problems';
import { problemsLoadBegin, problemsLoadFailure, setProblems } from '../../../store/actions/problems';
import problems from '../../fixtures/problems';
import problemInfos, { problemInfosAfterRemoveTick } from '../../fixtures/probleminfos';
import mockStore from 'redux-mock-store';

describe('problems reducers', () => {
    it('should set default state', () => {
        const state = problemsReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(initialState);
    })

    it('should start problem loading',() => {
        const action = {
           type : 'PROBLEMS_START_LOADING' ,
           loading : true
        }
        const state = problemsReducer(undefined, action);
        expect(state).toEqual({...initialState, loading : true});
    })

    it ('should fetch global ascent list successfully',() => {

    });
    it('should remove tick successfully',() => {
        const action = {
            type : 'DELETE_TICK_PUT',
            payload: {
                tickid : 530853,
                problemid: 47428,
            }
        }

        const state = problemsReducer(problemInfos,action);
        expect(state).toEqual(problemInfosAfterRemoveTick);
    })

    it('should return error message',()=> {
        const action = {
           type : 'PROBLEMS_LOAD_ERROR' ,
           error : 'test error'
        }
        const state = problemsReducer(undefined, action);
        expect(state).toEqual({...initialState, error : 'test error'});
    })


    it('should set problems',() => {
        const arr = ['arr'];
        const action = {
            type : 'SET_PROBLEMS',
            problems : arr
        }
        const state = problemsReducer(undefined,action);
        expect(state).toEqual({...initialState, problems : arr});
    })

})