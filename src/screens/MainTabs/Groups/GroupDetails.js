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
import moment from 'moment';
import { connect } from 'react-redux';
import globalStyles from '../../../styles/global'

export class GroupDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        }
      }

    componentDidMount = () => {
        let payload = {groupid : this.props.group.gid};
        this.props.onGetGroup(payload);
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
                <Text>Group description:</Text>
                <Text>{gd.groupdesc}</Text>
                  </View>
                <View style={styles.actionButtons}></View>
                <View style={styles.resultsContainer}>
                
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
        },
        groupDescription: {
            backgroundColor : '#454740',
            margin : 8,
            padding : 4,
            fontSize : 18,
            color : 'white',
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
