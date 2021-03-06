import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import IconBadge from 'react-native-icon-badge';
import { Navigation } from 'react-native-navigation';
import ActivitySpinner from 'react-native-loading-spinner-overlay';

import globalStyles from '../../../styles/global'

import ClimbingGroups from '../../../components/ClimbingGroups/ClimbingGroups'
import AllClimbingGroups from '../../../components/ClimbingGroups/AllClimbingGroups'
import PopularClimbingGroups from '../../../components/ClimbingGroups/PopularClimbingGroups'
import PendingGroupInvitations from '../../../components/ClimbingGroups/PendingGroupInvitations'
import GroupPreview from '../../../components/ClimbingGroups/GroupPreview';


export class Groups extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Groups' },
      { key: 'second', title: 'Invitations' },
      { key: 'third', title: 'Popular' },
    ],
    showGroupPreviewModal: false
  };
  componentDidMount = () => {
    this.props.loadMyGroups();
  }

  handleProblemClicked = (problemid) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.problemator.ProblemDetailScreen',
        passProps: {
          problemid
        }
      },
      options: {
        topBar: {
          title: {
            text: 'Problem' + " " + problemid
          }
        }
      }
    });
  }


  handleGroupSearchResultClicked = (group) => { 
    this.setState({ previewGroup : group.id, showGroupPreviewModal: true })
  }

  handleItemClicked = (group) => {
    // Do something
    console.log("Opening group",group);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.problemator.GroupDetailsScreen',
        passProps: {
          group,
          handleProblemClicked : this.handleProblemClicked
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
        <Modal
        animationType="slide"
        transparent={false}
        style={{ flex: 1 }}
        visible={this.state.showGroupPreviewModal}
        onRequestClose={() => {
            this.setState({ showGroupPreviewModal : false});
        }}>
            <GroupPreview onClose={() => { this.setState({ showGroupPreviewModal: false }) }} group={this.state.previewGroup} joinable={true} />
        </Modal>
        <View style={{ flex: 2 }}>
          <Text style={globalStyles.h1Style} >My groups</Text>
          <ClimbingGroups handleItemClicked={this.handleItemClicked} />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={globalStyles.h1Style} >All groups</Text>
          <AllClimbingGroups  handleItemClicked={(group) => { this.handleGroupSearchResultClicked(group) }} />
        </View>
      </View>
    );
  };
  secondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#252623' }]} >
      <PendingGroupInvitations />
    </View>
  );
  thirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#252623' }]} >
      <PopularClimbingGroups />
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
    if (tab.route.key == 'second') {
      
      return (
        <IconBadge
          BadgeElement={
            <Text style={{ color: '#FFFFFF' }}>{this.props.pending.length}</Text>
          }
          IconBadgeStyle={
            {
              width: 22,
              height: 22,
              backgroundColor: '#decc00'
            }
          }
          Hidden={this.props.pending.length == 0}
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
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => { return this.firstRoute(this.props) },
            second: this.secondRoute,
            third: this.thirdRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={this.renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
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
  badgeStyle: {
    color: 'white',
    backgroundColor: '#decc00',
    width: 20,
    height: 20,

  }

})

const mapStateToProps = (state) => {
  return {
      groups: state.groups.groups,
      pending: state.groups.pending,
      invitations: state.groups.invitations,
    uiState: state.problems.uiState,
    error: state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findProblemGlobal : (payload) => dispatch({type : 'GET_PROBLEM_SAGA',  payload }),
    loadMyGroups: () => dispatch({ type: 'MY_GROUPS_SAGA' })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Groups);
