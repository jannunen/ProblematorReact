export const initialState = {
   groups: [],
    groupDetails : [],
    groupSearchResults : [],
    pending: [],
    popular: [],
    loading : false,
    error : null,
    groupToFind : null,
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
        case 'JOIN_GROUP_PUT':
              // TODO: This needs actually to add the new group to be added to groups
              // so it shows in mygroups. And then API should be changed so that
              // the join message returns the details of the joined group.
          return {
              ...state,
              uiState : 'ready'
          };
        break;
        case 'SEARCH_GROUPS_PUT':
        // Deletes 'source' property from the payload object. If the API was
        // rewritten, the search results would be in their own property and
        // this would not be needed...
          newState =  {
              ...state,
              groupSearchResults : Object.values(Object.keys(payload).reduce((acc, cur) => cur === 'source' ? acc : {...acc, [cur]: payload[cur]}, {})),
              uiState : 'ready'
          };
          console.log("nws",newState)
          return newState
        break;

        case 'ACCEPT_INVITATION_PUT':
          return {
              ...state,
              uiState : 'ready',
              pending : state.pending.filter(item => { 
                  return item.invid !==source.invid
                })
          };
          break;
        case 'DECLINE_INVITATION_PUT':
          return {
              ...state,
              uiState : 'ready',
              pending : state.pending.filter(item => { 
                  return item.invid !== source.invid
                })
          };
          break;
        case 'SEND_GROUP_INVITATION_PUT':
          return {
              ...state,
              uiState : 'ready'
          };
          break;
        case 'SAVE_GROUP_PUT':
          return {
              ...state,
              uiState : 'ready'
          };
          break;
        case 'DELETE_GROUP_MEMBER_PUT':
        // TODO  Needs still further improvement. Should remove member ALSO from groups!  AND latestticks. But those are missing some UIDs
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
        case 'GROUP_TO_FIND':
        return  {
            ...state,
            groupToFind :  payload
 ,
        }
        break;
        case 'GROUP_PUT':
        return  {
            ...state,
            groupDetails : {
                ...state.groupDetails,
                [payload.id] : payload
            },
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

