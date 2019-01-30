import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';

export const goToAuth = () => {
  Promise.all([
    Icon.getImageSource("ios-log-in", 30),
    Icon.getImageSource("ios-home", 30)
  ]).then(sources => {
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


export const goHome = () => {
  Promise.all([
    FontAwesome.getImageSource("list-alt", 30),
    FontAwesome.getImageSource("users", 30),
  ]).then(sources => {

    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: 'MainBottomTabsId',
          children: [
            {
              stack: {
                id: 'App',
                children: [
                  {
                    component: {
                      name: 'com.problemator.HomeScreen',
                    }
                  }
              ],
                options: {
                  bottomTab: {
                    text: 'Problems',
                    selectedIconColor : 'white',
                    icon: sources[0]
                  }
                }

              }

            },
            {
              stack: {
                id: 'Groups',
                children: [ 
                  {
                    component: {
                      name: 'com.problemator.GroupsScreen',
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Groups',
                    selectedIconColor : 'white',
                    icon: sources[1],
                  }
                }
              }
            }
          ],
          options : {
            bottomTabs: {
              backgroundColor : "#decc00",
            }
          }
        }
      }
    })

  });
}
