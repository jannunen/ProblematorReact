import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/actionTypes";

const initialState = {
  token: null,
};

const reducer = (state = initialState, action) => {
  console.log("AUTH REDUCER");
  switch (action.type) {
    case AUTH_SET_TOKEN:
    console.log("setting atuh",action)
      return {
        ...state,
        token: action.payload.token,
        uid : action.payload.uid,
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        uid : null
      };
    default:
      return state;
  }
};

export default reducer;

