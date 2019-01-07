import { SET_PROBLEMS }  from './actionTypes';
import { API_ENDPOINT} from '../../../config';
import { authGetToken } from './index';

export const getProblems = (gymid) => {
    if (isNaN(gymid)) {
        gymid = 1;
    }
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            return fetch(API_ENDPOINT+"problems/?api-auth-token="+token+"&loc="+gymid);
        }).then(res => res.json())
        .then(parsedResp => {
            let problems = parsedResp;
            dispatch(setProblems(problems));
        })
    }
}

export const setProblems = problems => {
    return {
        type : SET_PROBLEMS,
        problems : problems
    }
}

export const selectGym = (gymid) => {
    return {
        type : actions.DELETE_PLACE,
        gymid
    }
}

