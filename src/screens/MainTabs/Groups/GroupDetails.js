import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native'

import ActivitySpinner from 'react-native-loading-spinner-overlay';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet'
import { Navigation } from 'react-native-navigation';
import globalStyles from '../../../styles/global'
import LeaderBoard from '../../../components/ClimbingGroups/LeaderBoard'
import LatestTicks from '../../../components/ClimbingGroups/LatestTicks'
import SendGroupInvitationModalContent from '../../../components/ClimbingGroups/SendGroupInvitationModal'
import GroupEditModalContent from '../../../components/ClimbingGroups/GroupEditModal'


export class GroupDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selectedSwiper : 0,
            showGroupInvitationModal: false,
            showGroupEditModal: false,
            test : false,
        }
      }

    componentDidMount = () => {
        let payload = {groupid : this.props.group.gid};
        this.props.onGetGroup(payload);
    }

    onSwiperIndexChanged = (index) => {
        console.log("changed",index);
        this.setState({
            selectedSwiper : index
        });
    }
    /*
    * Handles the swiper slide changing to desired index
    */
    changeSwiperSlideTo = (index) => {
        console.log("setting",index);
        const change = index - this.state.selectedSwiper;
        /*
        let change = 0; // no change
        if (index < this.state.selectedSwiper) {
            change = -1;
        }
        if (index > this.state.selectedSwiper) {
            change = 1;
        }
        if (change ==0) {
            return; // NO need to change
        }
        */
        this.swiper.scrollBy(change);
    }
    navigateToShowMembers = () => {
        Navigation.push(this.props.componentId, {
        component: {
            name: 'com.problemator.GroupShowMembers',
            passProps: {
              group :  this.props.groupDetails[this.props.group.gid]
            }
        },
        options: {
            topBar: {
            title: {
                text: 'Group' + " " + this.props.group.name
            }
            }
        }
        });

    }
    handleGroupAction = (idx) => {
        console.log("Handling group action: ",idx);
        if (idx == 0) {
            return;
        }
        switch (idx) {
            case 1:
            this.navigateToShowMembers();
            break;
            case 2:
            this.setState({ test : true, showGroupInvitationModal : true});
            break;
            case 3:
            // edit group
            this.setState({ test : true, showGroupEditModal : true});
            break;
            case 4:
            // leave group
            alert("tbd: leave group")
            break;
            case 5:
            // delete group
            alert("tbd: delete")
            break;
        }
    }
    render = () => {
        // Before state has been mapped, give out loading indicator...
        if (this.props.groupDetails.length==0) {
            return <View style={[styles.parent, globalStyles.defaultContainer]}>
                <ActivitySpinner
                    visible={this.props.uiState == 'loading'}
                    textContent={'Loading...'}
                    textStyle={{ color: 'white' }}
                    overlayColor="rgba(0,0,0,0.7)"
                />
            </View>;
        } 
        const g = this.props.group;
        const gd = this.props.groupDetails[g.gid];
        let groupActionOptions = [ 
            'Cancel',
            'Show Members',
            'Invite New Member(s)',
            'Edit Group',
            'Leave group',
        ];
        if (gd.me.isadmin==1) {
            groupActionOptions.push('Delete Group');
        }
        return (
            <View style={[styles.parent, globalStyles.defaultContainer]}>
                <ActionSheet
                ref={o => this.GroupActionSheet = o}
                title="Choose an action"
                options={groupActionOptions}
                cancelButtonIndex={0}
                onPress={this.handleGroupAction}
                />
                <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1 }}
                visible={this.state.showGroupInvitationModal}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}>
                    <SendGroupInvitationModalContent onClose={() => { this.setState({ showGroupInvitationModal: false }) }} group={g} />
                </Modal>
                <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1 }}
                visible={this.state.showGroupEditModal}
                onRequestClose={() => {
                    this.setState({ showGroupEditModal : false});
                }}>
                    <GroupEditModalContent onClose={() => { this.setState({ showGroupEditModal: false }) }} group={g} />
                </Modal>
                <View style={styles.groupHeader}>
                    <Text style={[globalStyles.h1Style, { flexGrow : 1}]}>Group Details</Text>
                    <View><TouchableOpacity onPress={() => { this.GroupActionSheet.show() }}><FontAwesome style={{ paddingTop : 5}} name="cog" color="#fff" size={25} /></TouchableOpacity></View>
                </View>
                <View style={styles.groupHeader}>
                    <View><Text style={styles.memberCount}>{gd.membercount} member(s)</Text></View>
                    <View>{(gd.public == 1) ? <Text style={styles.publicity}><FontAwesome size={20} name="eye" color="#fff" /> public</Text> : <Text style={styles.publicity}><FontAwesome size={20} name="eye-slash" color="#f00" /> private</Text>}</View>
                    <View>{(gd.me.isadmin == 1) ? <Text style={styles.publicity}><FontAwesome size={20} name="star" color="#decc00" /> admin</Text> : <Text style={styles.publicity}><FontAwesome size={20} name="user" color="#f00" /> member</Text>}</View>
                </View>
                <View style={styles.groupDescription}>
                <Text style={styles.groupDesc}>Group description:</Text>
                <Text style={styles.groupDescName}>{gd.groupdesc}</Text>
                  </View>
                <View style={styles.actionButtons}></View>
                <View style={styles.swiperHeaders}>
                    <View><TouchableOpacity onPress={() => {this.changeSwiperSlideTo(0)}}><Text style={[styles.swiperHeader, (this.state.selectedSwiper == 0 ? styles.selectedSwiper : null)]}>Boulder</Text></TouchableOpacity></View>
                    <View><TouchableOpacity onPress={() => {this.changeSwiperSlideTo(1)}}><Text style={[styles.swiperHeader, (this.state.selectedSwiper == 1 ? styles.selectedSwiper : null)]}>Sport</Text></TouchableOpacity></View>
                    <View><TouchableOpacity onPress={() => {this.changeSwiperSlideTo(2)}}><Text style={[styles.swiperHeader, (this.state.selectedSwiper == 2 ? styles.selectedSwiper : null)]}>Latest ticks</Text></TouchableOpacity></View>
                </View>
                <View style={styles.resultsContainer}>
                    <Swiper ref={(ref) => {this.swiper = ref}} style={styles.wrapper} onIndexChanged={this.onSwiperIndexChanged} showsButtons={true}
                     dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                     activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                     nextButton={<Text style={styles.navButtonText}>›</Text>}
                     prevButton={<Text style={styles.navButtonText}>‹</Text>} 
                     loop={false}
                    >
                    <View style={styles.slide1}>
                        <LeaderBoard data={gd.membersboulder} myRank={gd.me.rank} />
                    </View>
                    <View style={styles.slide2}>
                        <LeaderBoard data={gd.memberssport} myRank={gd.me.ranksport} />
                    </View>
                    <View style={styles.slide3}>
                        <LatestTicks handleProblemClicked={this.props.handleProblemClicked} ticks={gd.latestticks} />
                    </View>
                </Swiper>
                </View>


            </View>
        )
    }

}


const styles = StyleSheet.create({
        problemContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent : 'flex-start',
            backgroundColor : '#252623',
        },
        groupHeader: {
            flexDirection : 'row',
            height : 40,
            justifyContent : 'space-between',
            paddingLeft : 8,
            paddingRight : 8,
        },
        groupDescription: {
            backgroundColor : '#454740',
            margin : 8,
            padding : 4,
            fontSize : 18,
            color : 'white',
        },
        groupDesc : {
            color : 'white',
        },
        groupDescName: {
            color : '#d0d0d0',
        },
        memberCount : {
            color : '#decc00',
            textTransform: 'uppercase',
            fontSize : 20,
        },
        publicity: {
            color : 'white',
            textTransform: 'uppercase',
            fontSize : 20,
        },
        resultsContainer: {
            flex : 1,
        },
        swiperHeaders: {
            flexDirection : 'row',
            justifyContent : 'space-evenly',
            paddingTop : 4,
            paddingBottom : 4,
            borderTopWidth : 1,
            borderTopColor : 'white',
        },
        swiperHeader: {
            textTransform : 'uppercase',
            color : '#decc00',
            fontSize : 20,
        },
        selectedSwiper : {
            textDecorationLine : 'underline'
        },
        navButtonText : {
            color : 'rgba(255,255,255,0.5)',
            fontSize : 80,
        }   ,
        slide1: {
            flex: 1,
          },
          slide2: {
            flex: 1,
          },
          slide3: {
            flex: 1,
          },
          text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
          }
    });


    const mapStateToProps = (state) => {
        return {
            groupDetails : state.groups.groupDetails,
            uiState : state.problems.uiState,
            auth : state.auth
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            onGetGroup: (payload) => dispatch({ type : 'GROUP_SAGA', payload}),
    
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
