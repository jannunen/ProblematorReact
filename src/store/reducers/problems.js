import { DEL_BETAVIDEO_PUT, ADD_BETAVIDEO_PUT, GLOBAL_ASCENTS_PUT, DELETE_TICK_PUT,  GET_PROBLEM_PUT, SET_PROBLEMS, PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM } from '../actions/actionTypes'

import moment from 'moment';
export const initialState = {
    problems: [],
    probleminfos: [],
    globalAscents : [],
    loading : false,
    error : null,
}
const reducer = (state = initialState, action) => {
    const payload = action.payload;
    console.log(action.type,"payload to reducer",payload);
    let newState = null;
    switch (action.type) {
        case 'UI_LOADING':
         return  {
             ...state,
             state : 'loading',
         }
        break;
        case 'SAVE_TICK_PUT':
         return {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [payload.source.problemid] : {
                     ...state.probleminfos[payload.source.problemid],
                    myticklist :  {
                        ...state.probleminfos[payload.source.problemid].myticklist,
                        [payload.tick.id] : payload.tick 
                    },
                    mytickcount : parseInt(state.probleminfos[payload.source.problemid].mytickcount)+1,
                    ascentcount : parseInt(state.probleminfos[payload.source.problemid].ascentcount)+1,
                }
             },
             state : 'ready'
         }
        break;
        case DEL_BETAVIDEO_PUT:
        return  { 
            ...state,
            probleminfos : {
                ...state.probleminfos,
                [payload.problemid] : {
                    ...state.probleminfos[payload.problemid],
                    "betavideos" : 
                        state.probleminfos[payload.problemid].betavideos.filter( item => payload.source.videoid !== item.id),
                    
                }
            },
             state : 'ready'
        } 
        break;
        case ADD_BETAVIDEO_PUT:
        return  { 
            ...state,
            probleminfos : {
                ...state.probleminfos,
                [payload.problemid] : {
                    ...state.probleminfos[payload.problemid],
                    "betavideos" : [
                        ...state.probleminfos[payload.problemid].betavideos,
                        action.payload.video
                    ]
                }
            },
             state : 'ready'
        } 
        break;
        case GLOBAL_ASCENTS_PUT :
            const pid = payload.problemid;
            return {
                ...state,
                globalAscents : {
                    ...state.globalAscents,
                    [pid] : payload.ascents
                },
                state: 'ready'
            }
        break;

        case DELETE_TICK_PUT:
        // That stuff below... I'm not proud of that, but it basically goes 
        // to state.probleminfos[problemid].myticklist and removes the tickid
        // which is being deleted. Thank god for unit tests for these kind of
        // reducers!!!
         return {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [payload.problemid] : {
                     ...state.probleminfos[payload.problemid],
                    myticklist :  Object.keys(state.probleminfos[payload.problemid]['myticklist'])
                    .filter((key) => key !== payload.tickid )
                    .reduce((result,current) => {
                        result[current] =state.probleminfos[payload.problemid]['myticklist'][current];
                        return result;
                    },{})
                 }
             },
             state : 'ready'

         }

        break;

        case GET_PROBLEM_PUT:
        // Use 'hashtable' approach to make the searches faster for a certain problem
         return  {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [action.payload.problem.problemid]: action.payload.problem
             },
             state : 'ready'
         }
        break; 

        case PROBLEMS_LOAD_ERROR:
            return {
                ...state,
                state: 'ready',
                problems : [],
                error : action.payload.message
            }
        break;
        case SET_PROBLEMS:
            return {
                ...state,
                problems: action.payload,
                state: 'ready',
                error : null
            }
            break;

        default:
            console.log("Did not catch the action type!");
            return state;
            break;
    }
}

export default reducer;
