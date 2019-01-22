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


export const getProblem = (payload) => {
    return {
        type: 'GET_PROBLEM_SAGA',
        payload 
    }
};


export const getProblems = () => ({
    type : 'GET_PROBLEMS_SAGA'
})

