import { Navigation } from 'react-native-navigation';
import  Icon  from 'react-native-vector-icons/Ionicons';

export const goToAuth = () => {
  Promise.all([
    Icon.getImageSource("ios-log-in",30),
    Icon.getImageSource("ios-home",30)
  ]).then( sources => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'BottomTabsId',
          children: [
            {
              component: {
                name: 'com.problemator.SignInScreen',
                options: {
                  bottomTab: {
                    text: 'Sign In',
                    icon: sources[0] 
                  }
                }
              },
            },
            {
              component: {
                name: 'com.problemator.SignUpScreen',
                options: {
                  bottomTab: {
                    text: 'Sign Up',
                    icon: sources[1]
                  }
                }
              },
            },
          ],
        }
      }
    });

})
}


export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'com.problemator.HomeScreen',
          }
        }
    ],
    }
  }
})
