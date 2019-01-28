import { GLOBAL_ASCENTS_PUT, DELETE_TICK_PUT,  GET_PROBLEM_PUT, SET_PROBLEMS, PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM } from '../actions/actionTypes'

export const initialState = {
    problems: [],
    probleminfos: [],
    globalAscents : [],
    loading : false,
    error : null,
}
const reducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GLOBAL_ASCENTS_PUT :
            const pid = payload.problemid;
            return {
                ...state,
                globalAscents : {
                    ...state.globalAscents,
                    [pid] : payload.ascents
                }
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
             }
         }

        console.log("reducer delete tick",action);
        break;

        case GET_PROBLEM_PUT:
        // Use 'hashtable' approach to make the searches faster for a certain problem
         let newState= {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [action.payload.problem.problemid]: action.payload.problem
             }
         }
         return newState;
        break; 

        case PROBLEMS_START_LOADING:
        return {
            ...state,
            loading : true,
            error : null
        }
        break;
        case PROBLEMS_LOAD_ERROR:
            console.log("reducer",action);
        return {
            ...state,
            loading : false,
            problems : [],
            error : action.payload.message
        }
        break;
        case SET_PROBLEMS:
        console.log("Reducer",action.payload);
            return {
                ...state,
                problems: action.payload,
                loading : false,
                error : null
            }
            break;

        default:
            return state;
            break;
    }
}

export default reducer;
