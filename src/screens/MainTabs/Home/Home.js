import * as React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
  Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import {Navigation} from 'react-native-navigation';
import { connect } from 'react-redux';

import { goToAuth } from '../../navigation'
import { USER_KEY } from '../../../../config'
import { getProblems, selectGym } from '../../../store/actions/index';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >


  </View>
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
  <Text>T4est2</Text>
  </View>
);


class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'List' },
      { key: 'second', title: 'Map' },
    ],
    problemsLoaded : false
  };
  componentWillMount = () => {
    // Go ahead and fetch the problems
    this.props.onLoadProblems();
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Problems'
        },
      }
    };
  }
  logout = async () => {
    this.setState({
      code : null
    })
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    return (
        <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

    )
  }
}
/*
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'com.padadise.OtherScreen',
              }
            });
          }}
          title="View next screen"
        />

        */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scene: {
    flex: 1,
  }

})

const mapStateToProps = (state) => {
  return {
    problems : state.problems.problems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProblems : () => dispatch(getProblems()),
    onSelectGym : gymid => dispatch(selectGym(gymid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);