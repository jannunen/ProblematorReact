export const initialState = {
   groups: [],
    groupDetails : [],
    pending: [],
    popular: [],
    loading : false,
    error : null,
}
export default (state = initialState, action ) => {
    const payload = action.payload;
    let source = null;
    console.log(action.type,"payload to GROUPS reducer",action.payload);
    if (payload && payload.source) {
        source = payload.source;
    }
    let newState = null;
    switch (action.type) {
        case 'SEND_GROUP_INVITATION_PUT':
          return {
              ...state,
              uiState : 'ready'
          };
          break;
        case 'DELETE_GROUP_MEMBER_PUT':
        // TODO
        // NEeds still further improvement. Should remove member ALSO from groups! 
        // AND latestticks. But those are missing some UIDs
        return  {
            ...state,
            groupDetails : {
                ...state.groupDetails,
                [source.gid] : {
                    ...state.groupDetails[source.gid],
                    membercount : state.groupDetails[source.gid].membercount-1,
                    members : state.groupDetails[source.gid].members.filter((item, idx) => {
                        return item.uid !== source.uid;
                    }),
                    membersboulder : state.groupDetails[source.gid].membersboulder.filter((item, idx) => {
                        return item.uid !== source.uid;
                    }),
                    memberssport : state.groupDetails[source.gid].memberssport.filter((item, idx) => {
                        return item.uid !== source.uid;
                    }),
                
                }

            }
        }
        break;
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
            return state;
            break;
    }
}
export const invitationCount = (state) => state.groups.invitations.length;

