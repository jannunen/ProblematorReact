import { SET_PROBLEMS , PROBLEMS_LOAD_ERROR, PROBLEMS_START_LOADING, SELECT_GYM}  from './actionTypes';
import { API_ENDPOINT} from '../../../config';
import { authGetToken } from './index';
import problems from '../../tests/fixtures/problems';


export const problemsLoadBegin = () => ({
    type : PROBLEMS_START_LOADING
});

export const problemsLoadFailure = (err) => ({
    type : PROBLEMS_LOAD_ERROR,
    error : err
});

export const setProblems = problems => ({
    type : SET_PROBLEMS,
    problems : problems
});


export const getProblems = (gymid) => {
    if (isNaN(gymid)) {
        gymid = 1;
    }
    return (dispatch,getState) => {
        const token = getState().auth.token;
        const url = API_ENDPOINT+"problems/?api-auth-token="+token+"&loc="+gymid;
        console.log("call",url);
        // If developing, just take the problems from a fixture
        dispatch(setProblems(problems));
        return problems;

        return fetch(url)
        .then(res => res.text()) // This is because of JSONP
        .then(textResponse => {
            // Remove first and last, because of JSONP
            console.log("Fixing JSONP");
            if (textResponse.substr(0,1) == "(") {
                console.log("... but only if needed...");
                return JSON.parse(textResponse.substr(1).slice(0, -1));
            } else {
                return JSON.parse(textResponse);
            }
        })
        .then(parsedResp => {
            dispatch(setProblems(parsedResp));
            return parsedResp;
        })
        .catch(err => {
            console.log("Error loading problems",err);
            dispatch(problemsLoadFailure(err));
            return "Error loading problems";
        });
    }
}