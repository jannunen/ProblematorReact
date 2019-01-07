import { SET_PROBLEMS, PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM } from '../actions/actionTypes'

const initialState = {
    problems: [],
    selectedGym: null,
    loading : false,
    error : null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

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

        case SELECT_GYM:
            return {
                ...state,
                selectedGym: action.selectedGym

            }
            break;


        default:
            return state;
            break;
    }
}

export default reducer;
