export const initialState = {
    myComps: [],
    pastComps: [],
    comps: [], // Holds the loaded comps
    upcomingComps: [],
    compSearchResults: [],
 }
 export default (state = initialState, action ) => {
     const payload = action.payload;
     let source = null;
     console.log(action.type,"payload to COMPS reducer",action.payload);
     if (payload && payload.source) {
         source = payload.source;
     }
     let newState = null;
     switch (action.type) {
         case 'MY_COMPS_PUT':
           return {
               ...state,
               myComps : payload.mycomps,
               pastComps : payload.pastcomps,
               uiState : 'ready',
           };
         break;
 
         default:
             return state;
             break;
     }
 }
 
 