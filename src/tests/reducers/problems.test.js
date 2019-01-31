import problemsReducer, {initialState } from '../../reducers/problems';
import { problemsLoadBegin, problemsLoadFailure, setProblems } from '../../actions/problems';
import probleminfos from '../fixtures/probleminfos';
import basicState, { problemInfosAfterRemoveTick } from '../fixtures/probleminfos';
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
    it('should save opinion love correctly', () => {

        const action = {
            type : 'SAVE_OPINION_PUT',
            payload: {
                opinions : {
                likes : 14,
                loves : 3,
                dislikes : 2,
                },
                source : { opinion : 2, problemid : 47428 }
            }
        }

        let stateAfter = JSON.parse(JSON.stringify(basicState));
        const state = problemsReducer(basicState,action);
        expect(state.probleminfos['47428'].c_love).toEqual(3);
        expect(state.probleminfos['47428'].c_like).toEqual(14);
        expect(state.probleminfos['47428'].c_dislike).toEqual(2);
    })

    it('should add tick correctly', () => {
        const tickid = "630853";
        const aTick = {"problemid":"47428","id":"630853","added":"2018-12-27 14:03:16","userid":"246","tstamp":"2019-01-23 00:02:15","grade_opinion":"11","tries":"2","rating":null,"a_like":"0","a_love":"0","a_dislike":"0","a_dirty":"0","a_dangerous":"0","ascent_type":"0","tries_bonus":"0","sport_points":null,"sport_timer_start":null,"sport_timer_stop":null,"sport_timer_secs":null,"qual_start_pos":null,"tick_type":"1","bonuses":"0","tickid":"530853","ascent_type_text":"Lead"};
        const action = {
            type : 'SAVE_TICK_PUT',
            payload: {
                error : false,
                message : 'Tick saved',
                tick : aTick,
                source : { problemid : 47428 }
            }
        }

        let stateAfter = JSON.parse(JSON.stringify(basicState));
        const state = problemsReducer(basicState,action);
        stateAfter.probleminfos['47428'].myticklist = {
            ...stateAfter.probleminfos['47428'].myticklist ,
            [tickid] : aTick
        }
        expect(state.probleminfos['47428'].myticklist).toEqual(stateAfter.probleminfos['47428'].myticklist);
        expect(state.probleminfos['47428'].mytickcount).toEqual(3);
        expect(state.probleminfos['47428'].mytickcount).toEqual(3);
        expect(state.probleminfos['47428'].ascentcount).toEqual(13);

    })

    it('should add betavideo correctly',() => {
        const video_url = 'video_test';
        const newVideo = { id: "43", "video_url": video_url, "added": "2017-04-15 11:45:43", "sender": { "id": "62003", "etunimi": "Matti", "added": null } };
        const action = {
            type : 'ADD_BETAVIDEO_PUT',
            payload: {
                problemid : 47428,
                payload : { video : newVideo},
                source : { problemid : 47428 }
            }
        }


        initialState['probleminfos'] = probleminfos;
        let stateAfter = JSON.parse(JSON.stringify(initialState));
        console.log(initialState);
        
        const state = problemsReducer(initialState,action);
        // Add betavideo to state and expect them to match
        stateAfter.probleminfos[action.payload.source.problemid]['betavideos'].push( newVideo )
        expect(state).toEqual(   stateAfter )
    });


    it('should return error message',()=> {
        const action = {
           type : 'PROBLEMS_LOAD_ERROR' ,
           payload : {message : 'test error'}
        }
        const state = problemsReducer(undefined, action);
        expect(state).toEqual({...initialState, error : 'test error'});
    })


    it('should set problems',() => {
        const arr = ['arr'];
        const action = {
            type : 'SET_PROBLEMS',
            payload :   arr
        }
        const state = problemsReducer(undefined,action);
        expect(state).toEqual({...initialState, problems : arr});
    })

})