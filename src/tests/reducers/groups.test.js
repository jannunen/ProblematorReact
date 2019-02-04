import groupsReducers, {initialState } from '../../reducers/groups';
import groups , {groupDetails} from '../fixtures/groups'

describe('groups reducers', () => {
    it('should execute join group reducer',() => {
        const action = {
            type : 'JOIN_GROUP_PUT',
            payload : {
                error : false,
                message : 'Joined group',
                source : {
                    groupid : 6
                }
            }
        }
        let stateAfter = { ...initialState, uiState : 'ready'}
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });



    it('should execute group search reducer',() => {
        const results = {"0":{"id":"20","name":"Crack climber banana","usercount":"1"},"1":{"id":"24","name":"Climb back up","usercount":"2"},"2":{"id":"25","name":"Climbing","usercount":"1"},"3":{"id":"44","name":"DICE Climbing","usercount":"2"},"4":{"id":"58","name":"Climbing Buddies","usercount":"1"},"5":{"id":"67","name":"Tiny Climbers","usercount":"3"},"6":{"id":"83","name":"Climb stronger","usercount":"1"},"7":{"id":"127","name":"Climbingineurope","usercount":"1"},"8":{"id":"149","name":"Cityclimbers","usercount":"3"},"9":{"id":"154","name":"Mosa Climbers ry","usercount":"13"},"10":{"id":"180","name":"Fika-climbers 2.0","usercount":"1"},"11":{"id":"223","name":"Seychelles rockclimber","usercount":"1"},"12":{"id":"241","name":"Climb Shinrikyo","usercount":"2"},"13":{"id":"258","name":"Husby Climbers","usercount":"5"},"14":{"id":"274","name":"iClimb or iceCream","usercount":"4"},"15":{"id":"278","name":"PenguinsCanClimb","usercount":"2"},"16":{"id":"294","name":"Partners in Climb","usercount":"1"},"17":{"id":"304","name":"Norwegian Climbing Federation","usercount":"1"},"18":{"id":"333","name":"Climbing bunch","usercount":"4"},"19":{"id":"352","name":"LazyHazyClimbers","usercount":"3"}};
        const action = {
            type : 'SEARCH_GROUPS_PUT',
            payload : {
                ...results,
                source : {
                    term : 'test',
                }
            }
        }
        let stateAfter = { 
            ...initialState, 
            groupSearchResults : Object.values(results),
            uiState : 'ready',
        }
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });


    it('should execute accept invitation reducer',() => {
        const action = {
            type : 'ACCEPT_INVITATION_PUT',
            payload : {
                error : false,
                message : 'Accepted',
                source : {
                    invid : '310'
                }
            }
        }
        // Make sure reducer REMOVES the invitation when it's accepted
        const initialState = { pending : [...groups.pending]}
        let stateAfter = { pending : []}
        stateAfter.uiState = 'ready';
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });

    it('should execute decline invitation reducer',() => {
        const action = {
            type : 'DECLINE_INVITATION_PUT',
            payload : {
                error : false,
                message : 'declined',
                source : {
                    invid : "310"
                }
            }
        }
        const initialState = { pending : [...groups.pending]}
        let stateAfter = { pending : []}
        stateAfter.uiState = 'ready';
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });

    it('should execute save group reducer',() => {
        const action = {
            type : 'SAVE_GROUP_PUT',
            payload : {
                // No actual payload, just the source...
                source : {
                    name : 'nimi',
                    desc : 'joku'
                }
            }
        }
        let stateAfter = JSON.parse(JSON.stringify(initialState));
        stateAfter.uiState = 'ready';
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });

    it('should execute send invitations reducer',() => {
        const action = {
            type : 'SEND_GROUP_INVITATION_PUT',
            payload : {
                // No actual payload, just the source...
                source : {
                    emails : ['eka','toka'],
                    invitationText : "Jotain",
                }
            }
        }
        let stateAfter = JSON.parse(JSON.stringify(initialState));
        stateAfter.uiState = 'ready';
        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    });

    it('should remove group member',() => {

        const action = {
            type : 'DELETE_GROUP_MEMBER_PUT',
            payload : {
                // No actual payload, just the source...
                source : {
                    gid: 6,
                    uid: 246,
                }
            }
        }
        initialState.groupDetails = { [groupDetails.id] : groupDetails};
        initialState.groups = groups;

        let stateAfter = JSON.parse(JSON.stringify(initialState));
        let trueInitialState = JSON.parse(JSON.stringify(initialState));
        stateAfter.groupDetails = { [groupDetails.id] : groupDetails};
        // Remove user from all the places
        // First, members
        stateAfter.groupDetails[action.payload.source.gid].members = 
            stateAfter.groupDetails[action.payload.source.gid].members.filter((item, idx) => {
                return item.uid !== action.payload.source.uid
            })
 ;
        stateAfter.groupDetails[action.payload.source.gid].membercount--;
        //stateAfter.groups[action.payload.gid].usercount--;

        // Then from boulder ranking
        stateAfter.groupDetails[action.payload.source.gid].membersboulder = 
            stateAfter.groupDetails[action.payload.source.gid].membersboulder.filter((item, idx) => {
                return item.uid !== action.payload.source.uid
            })
 ;
        // Then from sport ranking
        stateAfter.groupDetails[action.payload.source.gid].memberssport = 
            stateAfter.groupDetails[action.payload.source.gid].memberssport.filter((item, idx) => {
                return item.uid !== action.payload.source.uid
            })
 ;
        // Then from last ascents ranking
        // uid is missing from that array...
        // leaderboulder is missing UID!

        const state = groupsReducers(trueInitialState,action);
        expect(state).toEqual(stateAfter);
    })
    it('should add a group successfully', () => {
        const action = {
            type : 'GROUP_PUT',
            payload : groupDetails
        }
        let stateAfter = JSON.parse(JSON.stringify(initialState));
        stateAfter.groupDetails = { [groupDetails.id] : groupDetails};

        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);
    })

    it('should add mygroups successfully',() => {
        const action = {
            type : 'MY_GROUPS_PUT',
            payload : groups
        }
        let stateAfter = JSON.parse(JSON.stringify(initialState));
        stateAfter.groups = groups.groups;
        stateAfter.pending = groups.pending;
        stateAfter.popular = groups.popular;

        const state = groupsReducers(initialState,action);
        expect(state).toEqual(stateAfter);

    })
});
