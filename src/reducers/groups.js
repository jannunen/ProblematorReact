import moment from 'moment';
export const initialState = {
    myGroups: [],
    loading : false,
    error : null,
}
const reducer = (state = initialState, action) => {
    const payload = action.payload;
    console.log(action.type,"payload to GROUPS reducer",payload);
    let newState = null;
    switch (action.type) {
        case MY_GROUPS_PUT:
            return {
                ...state,
                myGroups : payload
            }
            break;

        default:
            console.log("Did not catch the action type!");
            return state;
            break;
    }
}

export default reducer;
