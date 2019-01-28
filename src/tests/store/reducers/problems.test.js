import problemsReducer, {initialState } from '../../../store/reducers/problems';
import { problemsLoadBegin, problemsLoadFailure, setProblems } from '../../../store/actions/problems';
import problems from '../../fixtures/problems';
import basicState, { problemInfosAfterRemoveTick } from '../../fixtures/probleminfos';
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

        const state = problemsReducer(basicState,action);
        expect(state).toEqual(problemInfosAfterRemoveTick);
    })
    it('should remove betavideo correctly',() => {
        const betaVideo = { id: "43", "video_url": 'foourl', "added": "2017-04-15 11:45:43", "sender": { "id": "62003", "etunimi": "Matti", "added": null } };
        const action = {
            type : 'DEL_BETAVIDEO_PUT',
            payload: {
                problemid : 47428,
                source : { videoid : 43}
            }
        }

        basicState.probleminfos[action.payload.problemid]['betavideos'] = [betaVideo];
        let stateAfter = JSON.parse(JSON.stringify(basicState));
        const state = problemsReducer(basicState,action);
        // Add betavideo to state and expect them to match
        stateAfter.probleminfos[action.payload.problemid]['betavideos'].filter( (item, idx) => {
            return item.id !== 43;
        });
        expect(state.probleminfos).toEqual(stateAfter.probleminfos);
    })

    it('should add betavideo correctly',() => {
        const video_url = 'video_test';
        const newVideo = { id: "43", "video_url": video_url, "added": "2017-04-15 11:45:43", "sender": { "id": "62003", "etunimi": "Matti", "added": null } };
        const action = {
            type : 'ADD_BETAVIDEO_PUT',
            payload: {
                problemid : 47428,
                video : newVideo
            }
        }

        let stateAfter = JSON.parse(JSON.stringify(basicState));
        const state = problemsReducer(basicState,action);
        // Add betavideo to state and expect them to match
        stateAfter.probleminfos[action.payload.problemid]['betavideos'].push( newVideo )
        expect(state).toEqual(stateAfter);
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