import { SET_PROBLEMS , PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM}  from './actionTypes';
import { API_ENDPOINT} from '../../../config';
import { authGetToken } from './index';


export const problemsLoadBegin = () => ({
    type : PROBLEMS_START_LOADING
});

export const problemsLoadFailure = (err) => ({
    type : PROBLEMS_LOAD_ERROR,
    error : err
});


export const getProblems = (gymid) => {
    if (isNaN(gymid)) {
        gymid = 1;
    }
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            console.log("Using token",token);
            const url = API_ENDPOINT+"problems/?api-auth-token="+token+"&loc="+gymid;
            console.log("call",url);
            return fetch(url);
        })
        .then(res => res.text())
        //.then(res => res.json())
        .then(textResponse => {
            // Remove first and last
            return JSON.parse(textResponse.substr(1).slice(0,-1));
        })
        .then(parsedResp => {
            console.log("Here we have the parsed response",parsedResp);
            dispatch(setProblems(parsedResp));
            return parsedResp;
        })
        .catch(err => {
            alert("Error loading problems");
            console.log("Error loading problems",err);
            dispatch(problemsLoadFailure(err));
        });
    }
}

export const setProblems = problems => ({
        type : SET_PROBLEMS,
        problems : problems
});

