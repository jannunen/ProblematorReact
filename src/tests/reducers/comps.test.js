import compsReducer, {initialState } from '../../reducers/comps';
import  { myCompsAnswer} from '../fixtures/comps'

describe('comps reducers', () => {
    it('should execute my comps reducer',() => {
        const action = {
            type : 'MY_COMPS_PUT',
            payload : {
                mycomps : myCompsAnswer.mycomps,
                pastcomps : myCompsAnswer.pastcomps,
                source : {
                }
            }
        }
        let stateAfter = { 
            ...initialState,
            myComps: myCompsAnswer.mycomps,
            pastComps: myCompsAnswer.pastcomps,
            uiState: 'ready'
        }
        const state = compsReducer(initialState,action);
        expect(state).toEqual(stateAfter);
    });


});
