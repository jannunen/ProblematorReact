import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import { Navigation } from 'react-native-navigation';
import EmptyState from '../../components/EmptyState/EmptyState'
import { findGroup } from '../../selectors/groupSelectors';
import GroupPreview from './GroupPreview';

export class PendingClimbingGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedInvitation: null,
          selectedInvitationGroup: null,
          showGroupPreviewModal : false
        }
    }
  componentDidMount = () => {
  }
  handleItemClicked = (item) => {
    // Dispatch groupToFind so we can use selector later
    this.props.onSetGroupToFind(item.gid);
    this.setState({ selectedInvitationGroup : item.gid});
    this.setState({ selectedInvitation : item});
    this.InvitationActionSheet.show();
    

  }
    handleInvitationAction = (idx) => {
        if (idx == 0) {
            return;
        }
        const invitation = this.state.selectedInvitation;
        switch (idx) {
          case 1:
          this.props.onAcceptInvitation({invid : invitation.invid });
          break;
          case 2:
          this.props.onDeclineInvitation({invid : invitation.invid });
          break;
          case 3:
          this.openGroupDetails()
          break;
        }

    }
    openGroupDetails = (group) => {
      this.setState({ showGroupPreviewModal : true})
      /*
      Navigation.push(this.props.componentId, {
        component: {
          name: 'com.problemator.GroupPreviewScreen',
          passProps: {
            group,
          }
        },
        options: {
          topBar: {
            title: {
              text: 'Group Preview'
            }
          }
        }
      });
      */

    }
  listItem = (item, index ) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <Modal
        animationType="slide"
        transparent={false}
        style={{ flex: 1 }}
        visible={this.state.showGroupPreviewModal}
        onRequestClose={() => {
            this.setState({ showGroupPreviewModal : false});
        }}>
            <GroupPreview onClose={() => { this.setState({ showGroupPreviewModal: false }) }} group={this.state.selectedInvitationGroup} />
        </Modal>
        <View key={"lic" + item.gid} style={styles.listItemContainer}>
          <View style={{ flex : 1, flexDirection: 'row' }}>

            <View style={{ flex : 1, flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={styles.groupLeaderCell}>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Text style={styles.groupMembers}>{item.group.userCount} member(s)</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.inviter} >{item.from.etunimi} {item.from.sukunimi}</Text>
                  <Text style={styles.invited} >{item.createdstr} {moment(item.created).fromNow()}</Text>
                </View>
              </View>
              <View style={styles.invmsgContainer}>
                <Text style={styles.invmsg}>{item.invmsg}</Text>
              </View>
            </View>
            <View>
              <Text key={"arrowright" + item.problemid} style={styles.listItemRight}>
                <Icon name="ios-arrow-forward" size={30} color="#decc00" />
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  transFormGroupsToFlatList = () => {
    return this.props.pending.map(item => { return { ...item, key: item.gid } });
  }
  render() {
      console.log('this.props.pending', this.props.pending)
      const invitationOptions = [
          'Cancel',
          'Accept',
          'Decline',
          'Open group'
      ];
    return (
      <View style={{ flex: 1 }}>
                <ActionSheet
                ref={o => this.InvitationActionSheet = o}
                title="Group Invitation"
                message="You can choose, whether to accept/decline or check the group"
                options={invitationOptions}
                cancelButtonIndex={0}
                onPress={this.handleInvitationAction}
                />

        {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
        {this.props.pending.length==0 && <EmptyState >No invitations</EmptyState>}
        {this.props.pending && 
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
        }
        </View>
      )
    }

  }

  const mapStateToProps = (state) => {
    return {
        pending: state.groups.pending,
        groups: state.groups.groups,
        uiState: state.problems.uiState,
        error: state.problems.error,
        findGroup : findGroup(state),
        groupToFind : state.groups.groupToFind
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onAcceptInvitation: (payload) => dispatch({ type: 'ACCEPT_GROUP_INVITATION_SAGA', payload }),
      onDeclineInvitation: (payload) => dispatch({ type: 'DECLINE_GROUP_INVITATION_SAGA', payload }),
      onSetGroupToFind: (payload) => dispatch({ type: 'SET_GROUP_TO_FIND_SAGA', payload }),
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
      height : 80,
    },
    invmsg : {
      color : 'white',
      padding : 4,
      fontSize : 14,
    },
    invmsgContainer : {
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
    groupLeaderCell: {
      width : '40%',
    },
    invited: {
        color : 'white',
    },
    inviter: {
        color : 'white',
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



