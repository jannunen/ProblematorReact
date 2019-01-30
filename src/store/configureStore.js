import { createStore , combineReducers, compose, applyMiddleware } from 'redux';

import problemsReducer from './reducers/problems'
import authReducer from './reducers/auth'
import groupsReducer from './reducers/groups'
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index';

const rootReducer = combineReducers({
    problems : problemsReducer,
    auth : authReducer,
    groups : groupsReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    //return createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
    const middleWares = [thunk, sagaMiddleware];
    store  = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));
    sagaMiddleware.run(rootSaga);
    const action = type => store.dispatch({type})
    return store;
}

export default configureStore;