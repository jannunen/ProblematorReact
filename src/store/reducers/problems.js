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
        console.log("GET_PROBLEM_PUT");
         return {
             ...state,
             probleminfos : [ ...state.probleminfos, action.payload]
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
        return {
            ...state,
            loading : false,
            problems : [],
            error : action.error
        }
        break;
        case SET_PROBLEMS:
            return {
                ...state,
                problems: action.problems,
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
