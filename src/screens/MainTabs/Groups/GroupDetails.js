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
import moment from 'moment';
import { connect } from 'react-redux';

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
        const g = this.props.group;
        return (
            <View style={styles.parent}>
                <ActivitySpinner
                    visible={this.props.uiState == 'loading'}
                    textContent={'Loading...'}
                    textStyle={{ color : 'white'}}
                    overlayColor="rgba(0,0,0,0.7)"
                />
                <Text>Group Details</Text>

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
    });


    const mapStateToProps = (state) => {
        return {
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
