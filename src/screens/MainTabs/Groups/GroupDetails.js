import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
  TouchableOpacity,
  Dimensions,
  ART
} from 'react-native'

import  Icon  from 'react-native-vector-icons/Ionicons';
import ActivitySpinner from 'react-native-loading-spinner-overlay';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { connect } from 'react-redux';
import globalStyles from '../../../styles/global'
import LeaderBoard from '../../../components/ClimbingGroups/LeaderBoard'

export class GroupDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selectedSwiper : 0,
        }
      }

    componentDidMount = () => {
        let payload = {groupid : this.props.group.gid};
        this.props.onGetGroup(payload);
    }

    onSwiperIndexChanged = (index) => {
        this.setState({
            selectedSwiper : index
        });
    }
    /*
    * Handles the swiper slide changing to desired index
    */
    changeSwiperSlideTo = (index) => {
        const newIndex =index-this.state.selectedSwiper;
        this.swiper.scrollBy(newIndex);
        this.setState({
            selectedSwiper : index
        })
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

        return (
            <View style={[styles.parent, globalStyles.defaultContainer]}>
                
                <Text style={globalStyles.h1Style}>Group Details</Text>
                <View style={styles.groupHeader}>
                    <View><Text style={styles.memberCount}>{gd.membercount} member(s)</Text></View>
                    <View>{(gd.public == 1) ? <Text style={styles.publicity}><FontAwesome size={20} name="eye" color="#fff" /> public</Text> : <Text style={styles.publicity}><FontAwesome size={20} name="eye-slash" color="#f00" /> private</Text>}</View>
                    <View>{(gd.me.isadmin == 1) ? <Text style={styles.publicity}><FontAwesome size={20} name="star" color="#decc00" /> admin</Text> : <Text style={styles.publicity}><FontAwesome size={20} name="user" color="#f00" /> member</Text>}</View>
                    <View><TouchableOpacity ><FontAwesome name="cog" color="#fff" size={20} /></TouchableOpacity></View>
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
                    >
                    <View style={styles.slide1}>
                        <LeaderBoard data={gd.membersboulder} myRank={gd.me.rank} />
                    </View>
                    <View style={styles.slide2}>
                        <LeaderBoard data={gd.memberssport} myRank={gd.me.ranksport} />
                    </View>
                    <View style={styles.slide3}>
                    <Text style={styles.text}>Latest</Text>
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
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#97CAE5',
          },
          slide3: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#92BBD9',
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
