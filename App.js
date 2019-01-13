import { PermissionsAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
import registerScreens from './src/screens/screens';
console.disableYellowBox = true;
  console.warn('YellowBox is disabled.');

registerScreens();


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'com.problemator.InitializingScreen'
      }
    },
  });
});

// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};