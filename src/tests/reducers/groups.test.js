import groupsReducers, {initialState } from '../../reducers/groups';
import { problemsLoadBegin, problemsLoadFailure, setProblems } from '../../actions/problems';
import basicState, { problemInfosAfterRemoveTick } from '../fixtures/probleminfos';
import mockStore from 'redux-mock-store';
import groups , {groupDetails} from '../fixtures/groups'

describe('groups reducers', () => {
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
