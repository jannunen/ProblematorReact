import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

export class PendingClimbingGroups extends React.Component {

  componentDidMount = () => {
  }
  handleItemClicked = (item) => {
  }
  listItem = (item, index ) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <View key={"lic" + item.gid} style={styles.listItemContainer}>
          <View style={styles.groupLeaderCell}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupMembers}>{item.usercount} member(s)</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.groupDesc} >Click for description</Text>
          </View>
          <View>
            <Text key={"arrowright" + item.problemid} style={styles.listItemRight}>
              <Icon name="ios-arrow-forward" size={30} color="#decc00" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  transFormGroupsToFlatList = () => {
    return this.props.pending.map(item => { return { ...item, key: item.gid } });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
        <FlatList
          style={styles.groupList}
          renderItem={({ item, index, }) =>
            this.listItem(item, index )
          }
          keyExtractor={(item, index) => {
            const key = item['gid'] + "_" + index;
            return key;
          }}
            data={this.transFormGroupsToFlatList()}
          />
        </View>
      )
    }

  }

  const mapStateToProps = (state) => {
    return {
        invitationCount: state.groups.invitationCount,
        pending: state.groups.pending,
        uiState: state.problems.uiState,
        error: state.problems.error
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    }
  }
  const styles = StyleSheet.create({
    groupList: {
      backgroundColor: "#30312e",
    },
    listItemContainer: {
      paddingTop : 4,
      paddingLeft : 2,
      paddingBottom : 4,
      flex : 1,
      flexDirection : 'row',
      width : "100%",
      borderColor : '#636169',
      borderBottomWidth : 1,
      justifyContent : 'space-between',
      height : 47,
    },
    listItemRight: {
      alignSelf : 'flex-end',
      paddingRight : 8
    },
    groupName: {
      fontWeight : 'bold',
      color : 'white',
      fontSize : 20,
    },
    groupMembers: {
      color : '#d0d0d0',
      paddingBottom : 4,
    },
    groupInfoRow: {
      width : "40%",
    },
    groupLeaderCell: {
      flexGrow : 1,

    },
    groupDesc : {
      color : '#decc00',
      fontSize : 14,
      paddingTop : 8,
      paddingRight : 8,
    },
    groupFounded : {
      color : 'white',
    }
    
  });

  export default connect(mapStateToProps, mapDispatchToProps)(PendingClimbingGroups);



