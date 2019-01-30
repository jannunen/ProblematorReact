import groupsReducers, {initialState } from '../../reducers/groups';
import { problemsLoadBegin, problemsLoadFailure, setProblems } from '../../actions/problems';
import basicState, { problemInfosAfterRemoveTick } from '../fixtures/probleminfos';
import mockStore from 'redux-mock-store';
import groups , {groupDetails} from '../fixtures/groups'

describe('groups reducers', () => {
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
