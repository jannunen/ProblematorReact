import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import { Navigation } from 'react-native-navigation';

import globalStyles from '../../../styles/global'

import ClimbingGroups from '../../../components/ClimbingGroups/ClimbingGroups'
import SearchGroups from '../../../components/ClimbingGroups/SearchGroups'
import SearchGroupHits from '../../../components/ClimbingGroups/SearchGroupHits'


export class Groups extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'My Groups' },
      { key: 'second', title: 'Invitations' },
      { key: 'third', title: 'Popular' },
    ],
  };

  handleItemClicked = (group) => {
    // Do something
    console.log("Opening group",group);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.problemator.GroupDetailsScreen',
        passProps: {
          group
        }
      },
      options: {
        topBar: {
          title: {
            text: 'Group' + " " + group.name
          }
        }
      }
    });

  }


  firstRoute = () => {
    return (
      <View style={[styles.scene, { backgroundColor: '#252623' }]} >
         <Text style={globalStyles.h1Style} >My groups</Text>
         <ClimbingGroups handleItemClicked={this.handleItemClicked} />
         <SearchGroups />
         { this.props.searchGroupHits ? 
                <View>
                    <Text>Search hits:</Text>
                    <SearchGroupHits />
                </View>
            : null
         }
      </View>
    );
  };
  secondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#252623' }]} >
    <Text>T4est2</Text>
    </View>
  );
  thirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#252623' }]} >
    <Text>Third</Text>
    </View>
  );
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Groups'
        },
      }
    };
  }
  renderBadge = (tab) => {
      if(tab.route.key == 'second') {
          return (
              <IconBadge
                  BadgeElement={
                      <Text style={{ color: '#FFFFFF' }}>{this.props.invitationCount}</Text>
                  }
                  IconBadgeStyle={
                      {
                          width: 22,
                          height: 22,
                          backgroundColor: '#decc00'
                      }
                  }
                  Hidden={this.props.invitationCount == 0}
              />)
      }
  }
  renderTabBar = (props) => {
    return (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#decc00' }}
          renderBadge={this.renderBadge}
        />
    )
  }


  render() {
    return (
      <SafeAreaView style={{flex : 1}}>
        <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => {return this.firstRoute(this.props)},
          second: this.secondRoute,
          third: this.thirdRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        renderTabBar={this.renderTabBar}
        initialLayout={{ width: Dimensions.get('window').width, height : Dimensions.get('window').height }}
      />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF',

  },
  scene: {
    flex: 1,
  },
  badgeStyle : {
      color : 'white',
      backgroundColor : '#decc00',
      width : 20,
      height : 20,

  }

})

const mapStateToProps = (state) => {
  return {
    invitationCount : state.groups.invitationCount,
    loading : state.problems.loading,
    error : state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Groups);
