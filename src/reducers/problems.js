import { DEL_BETAVIDEO_PUT, ADD_BETAVIDEO_PUT, GLOBAL_ASCENTS_PUT, DELETE_TICK_PUT,  GET_PROBLEM_PUT, SET_PROBLEMS, PROBLEMS_LOAD_ERROR } from '../actions/actionTypes'

export const initialState = {
    problems: [],
    probleminfos: [],
    globalAscents : [],
    loading : false,
    error : null,
    uiState : 'ready'
}
const reducer = (state = initialState, action) => {
    const payload = action.payload;
    let source=null;
    if (payload && payload.source) {
        source = {...payload.source};
    }
    let newState = null;
    console.log("Problems reducer ",action.payload)
    switch (action.type) {
        case 'ALERT_MESSAGE':
        return {
            ...state
        }
        break;
        case 'SAVE_OPINION_PUT':
         return {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [source.problemid] : {
                     ...state.probleminfos[source.problemid],
                     c_like :  payload.opinions.likes,
                     c_love :   payload.opinions.loves,
                     c_dislike :  payload.opinions.dislikes,
                 }
             },
             uiState : 'ready'
         }
        break;

        case 'SAVE_FEEDBACK_PUT':
         return {
             ...state,
             uiState : 'ready'
         }
        break;
        case 'UI_LOADING':
         return  {
             ...state,
             uiState : payload.uiState,
         }
        break;
        case 'UI_STOP_LOADING':
         return  {
             ...state,
             uiState : 'ready',
         }
        break;
        case 'SAVE_TICK_PUT':
         return {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [source.problemid] : {
                     ...state.probleminfos[source.problemid],
                    myticklist :  {
                        ...state.probleminfos[source.problemid].myticklist,
                        [payload.tick.id] : payload.tick 
                    },
                    mytickcount : parseInt(state.probleminfos[source.problemid].mytickcount)+1,
                    ascentcount : parseInt(state.probleminfos[source.problemid].ascentcount)+1,
                }
             },
             uiState : 'ready'
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
                        state.probleminfos[payload.problemid].betavideos.filter( item => source.videoid !== item.id),
                    
                }
            },
             uiState : 'ready'
        } 
        break;
        case ADD_BETAVIDEO_PUT:
        return  { 
            ...state,
            probleminfos : {
                ...state.probleminfos,
                [source.problemid] : {
                    ...state.probleminfos[source.problemid],
                    "betavideos" : [
                        ...state.probleminfos[source.problemid].betavideos,
                        action.payload.video
                    ]
                }
            },
             uiState : 'ready'
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
                uiState: 'ready'
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
             uiState : 'ready'

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
             uiState : 'ready'
         }
        break; 

        case PROBLEMS_LOAD_ERROR:
            return {
                ...state,
                uiState: 'ready',
                problems : [],
                error : action.payload.message
            }
        break;
        case SET_PROBLEMS:
            return {
                ...state,
                problems: action.payload,
                uiState: 'ready',
                error : null
            }
            break;

        default:
            return state;
            break;
    }
}

export default reducer;
