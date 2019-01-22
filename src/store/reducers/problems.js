import { GET_PROBLEM_PUT, SET_PROBLEMS, PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM } from '../actions/actionTypes'

export const initialState = {
    problems: [],
    probleminfos: [],
    loading : false,
    error : null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PROBLEM_PUT:
        // Use 'hashtable' approach to make the searches faster for a certain problem
         return {
             ...state,
             probleminfos : {
                 ...state.probleminfos,
                 [action.payload.problem.problemid]: action.payload.problem
             }
         }
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
