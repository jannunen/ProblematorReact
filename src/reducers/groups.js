export const initialState = {
    groups: [],
    groupDetails : [],
    pending: [],
    popular: [],
    loading : false,
    error : null,
}
export default (state = initialState, action) => {
    const payload = action.payload;
    let source = null;
    if (payload && payload.source) {
        source = {...payload.source};
        delete action.payload.source;
    }
    console.log(action.type,"payload to GROUPS reducer",payload);
    let newState = null;
    switch (action.type) {
        case 'GROUP_PUT':
        return  {
            ...state,
            groupDetails : {
                ...state.groupDetails,
                [payload.id] : payload
            }
        }
        break;
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

