export const initialState = {
    groups: [],
    pending: [],
    popular: [],
    loading : false,
    error : null,
}
export default (state = initialState, action) => {
    const payload = action.payload;
    console.log(action.type,"payload to GROUPS reducer",payload);
    let newState = null;
    switch (action.type) {
        case 'MY_GROUPS_PUT':
        return  {
                ...state,
                groups : payload.groups,
                pending : payload.pending,
                popular : payload.popular,
            }
            break;

        default:
            console.log("Did not catch the action type for "+action.type+"! ");
            return state;
            break;
    }
}
export const invitationCount = (state) => state.groups.invitations.length;

