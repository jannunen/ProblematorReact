import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
  Modal,
  SafeAreaView,
    Dimensions
  } from "react-native";
import IconBadge from 'react-native-icon-badge';
import { connect } from "react-redux";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from 'react-native-navigation';
import ActivitySpinner from 'react-native-loading-spinner-overlay';

import globalStyles from '../../../../styles/global'
import MyCompetitions from '../../../../components/Competitions/MyCompetitions'

export class CompetitionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
            { key: 'first', title: 'My comps' },
            { key: 'second', title: 'Upcoming' },
            { key: 'third', title: 'Past comps' },
            ],
        };
    }

  componentDidMount = () => {
  }
  handleMyCompClicked = (comp) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'com.problemator.PointEntryScreen',
                passProps: {
                    comp,
                }
            },
            options: {
                topBar: {
                    title: {
                        text: 'Competition Point Entry'
                    }
                }
            }
        });

  }
  firstRoute = () => {
    return (
      <View style={[globalStyles.scene ]} >
        <MyCompetitions handleItemClicked={this.handleMyCompClicked} />
      </View>
    );
  };
  secondRoute = () => (
    <View style={[globalStyles.scene ]} >
    <Text>Second page</Text>
    </View>
  );
  thirdRoute = () => (
    <View style={[globalStyles.scene ]} >
    <Text>Third page</Text>
    </View>
  );

  render() {
          //renderTabBar={this.renderTabBar}
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: this.firstRoute,
            second: this.secondRoute,
            third: this.thirdRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
})

const mapStateToProps = (state) => {
  return {
    uiState: state.problems.uiState,
    error: state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionScreen);
