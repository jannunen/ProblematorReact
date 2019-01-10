import { Provider } from 'react-redux';

import { Navigation} from 'react-native-navigation';
import InitializingScreen from './Initializing/Initializing';
import SignInScreen from './Auth/SignIn/SignIn';
import SignUpScreen from './Auth/SignUp/SignUp';
import HomeScreen from './MainTabs/Home/Home';
import OtherScreen from './MainTabs/Other/Other';
import ProblemDetailScreen from './MainTabs/Problems/ProblemDetailScreen/ProblemDetailScreen';

import configureStore from '../store/configureStore';

const store = configureStore();

export default registerScreens = () => {
    Navigation.registerComponentWithRedux('com.problemator.HomeScreen', () => HomeScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.InitializingScreen', (sc) => InitializingScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.SignInScreen', () =>  SignInScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.SignUpScreen', () =>  SignUpScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.OtherScreen', () => OtherScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.problemator.ProblemDetailScreen', () => ProblemDetailScreen, Provider, store);
} 
