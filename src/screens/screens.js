import { Provider } from 'react-redux';

import { Navigation} from 'react-native-navigation';

import InitializingScreen from './Initializing/Initializing';
import SignInScreen from './Auth/SignIn/SignIn';
import SignUpScreen from './Auth/SignUp/SignUp';
import HomeScreen from './MainTabs/Home/Home';
import OtherScreen from './MainTabs/Other/Other';
import GroupsScreen from './MainTabs/Groups/Groups';
import ProblemDetailScreen from './MainTabs/Problems/ProblemDetailScreen/ProblemDetailScreen';

import { createStore , combineReducers, compose, applyMiddleware } from 'redux';

import problemsReducer from '../reducers/problems'
import authReducer from '../reducers/auth'

import createSagaMiddleware from 'redux-saga'
import  watcherSaga   from '../sagas/index';


const rootReducer = combineReducers({
    problems : problemsReducer,
    auth : authReducer
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const sagaMiddleware = createSagaMiddleware();
const middleWares = [ sagaMiddleware];
store  = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));
sagaMiddleware.run(watcherSaga);
const action = type => store.dispatch({type})


export default registerScreens = () => {
    Navigation.registerComponentWithRedux('com.problemator.HomeScreen', () => HomeScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.InitializingScreen', (sc) => InitializingScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.SignInScreen', () =>  SignInScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.SignUpScreen', () =>  SignUpScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.OtherScreen', () => OtherScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.GroupsScreen', () => GroupsScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.ProblemDetailScreen', () => ProblemDetailScreen, Provider, store);
} 
