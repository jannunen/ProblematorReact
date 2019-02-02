import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ART
} from 'react-native'

import  Icon  from 'react-native-vector-icons/Ionicons';
import ActivitySpinner from 'react-native-loading-spinner-overlay';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet'
import globalStyles from '../../../styles/global'

export class GroupShowMembers extends React.Component {

    constructor(props){
        super(props)
        this.state = {
        }
      }

    componentDidMount = () => {

    }
    onDeleteGroupMember = (gid,uid) => {
        this.props.onDeleteGroupMember({gid: gid, uid: uid});
    }

    renderItem = ({item}) => {
        return (
            <View key={item.uid} style={globalStyles.listItemContainer}>
                <View>
                    <Text style={item.isme==0 ? styles.nameText : styles.meText}>{item.etunimi} {item.sukunimi}</Text>
                </View>
                <View>
                    {item.isadmin == 1 && <Text style={styles.memberAttributes}>admin</Text> }
                    {item.isfounder == 1 && <Text style={styles.memberAttributes}>founder</Text> }
                </View>
                {item.isadmin && 
                <View style={styles.null}>
                    <TouchableOpacity onPress={() => this.onDeleteGroupMember(item.gid,item.uid)}>
                        <FontAwesome name="user-times" color="white" size={ 24 } />
                    </TouchableOpacity>
                </View>
                }
            </View>);
    }

    render = () => {
        if (this.props.groupDetails == null) {
            return <ActivityIndicator>Loading....</ActivityIndicator>
        }
        const g = this.props.groupDetails[this.props.group.id];
        return (
            <View style={[styles.parent, globalStyles.defaultContainer]}>
                <Text style={globalStyles.h1Style}>GROUP MEMBERS</Text>
                <Text style={globalStyles.h2Style}>{g.membercount} member(s)</Text>
                <FlatList
                    data={g.members}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    nameText: {
        color : 'white',
        fontSize : 20,
    },
    meText: {
        color : '#decc00',
        fontSize : 20,
    },
    memberAttributes: {
        color : '#636169',
        textTransform : 'uppercase',
        fontSize : 16,
    }

});


const mapStateToProps = (state) => {
    return {
        groupDetails : state.groups.groupDetails,
        uiState: state.problems.uiState,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteGroupMember: (payload) => dispatch({ type: 'DELETE_GROUP_MEMBER_SAGA', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupShowMembers);
