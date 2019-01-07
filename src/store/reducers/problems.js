import { SET_PROBLEMS, SELECT_GYM } from '../actions/actionTypes'

const initialState = {
    problems: [],
    selectedGym: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROBLEMS:
         return {
             ...state,
            problems: action.problems
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
