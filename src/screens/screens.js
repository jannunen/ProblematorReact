import { Provider } from 'react-redux';

import { Navigation} from 'react-native-navigation';
import InitializingScreen from './Initializing/Initializing';
import SignInScreen from './Auth/SignIn/SignIn';
import SignUpScreen from './Auth/SignUp/SignUp';
import HomeScreen from './MainTabs/Home/Home';
import OtherScreen from './MainTabs/Other/Other';

import configureStore from '../store/configureStore';

const store = configureStore();

export default registerScreens = () => {
    Navigation.registerComponentWithRedux('com.padadise.HomeScreen', () => HomeScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.padadise.InitializingScreen', (sc) => InitializingScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.padadise.SignInScreen', () =>  SignInScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.padadise.SignUpScreen', () =>  SignUpScreen, Provider, store);
    Navigation.registerComponentWithRedux('com.padadise.OtherScreen', () => OtherScreen, Provider, store);
} 
