import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { connect } from 'react-redux';

import { goToAuth } from '../../navigation'
import { USER_KEY } from '../../../../config'
import { selectGym } from '../../../store/actions/index';
import ProblemList from '../../../components/ProblemList/ProblemList';


export class Home extends React.Component {
  handleItemClicked = (problemid) => {
    // Do something
    console.log(problemid);
  }
  firstRoute = () => {
    return (
      <View style={[styles.scene, { backgroundColor: '#252623' }]} >
        <ProblemList handleItemClicked={this.handleItemClicked} />
      </View>
    );
  };
  secondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#252623' }]} >
    <Text>T4est2</Text>
    </View>
  );
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'List' },
      { key: 'second', title: 'Map' },
    ],
    problemsLoaded : false
  };

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
          first: () => {return this.firstRoute(this.props)},
          second: this.secondRoute,
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
  },

})

const mapStateToProps = (state) => {
  return {
    loading : state.problems.loading,
    error : state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectGym : gymid => dispatch(selectGym(gymid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);