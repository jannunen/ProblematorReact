import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import globalStyles from '../../styles/global'
import { connect } from 'react-redux';
import ProblematorButton from '../ProblematorButton/ProblematorButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import LoadingState from '../../components/LoadingState/LoadingState'
import moment from 'moment';

export class GroupEditModalContent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        let payload = {groupid : this.props.group};
        this.props.onGetGroup(payload);
    }
    setModalVisible = (visible) => {
        this.props.onClose();
    }

    render() {
        if (this.props.groupDetails[this.props.group] == null) {
            return (
                <View style={[globalStyles.modalContainer, styles.modalContainer]}>
                    <LoadingState>Please wait, loading group preview...</LoadingState>
                </View>
                )
        }
        const group = this.props.groupDetails[this.props.group];
        return (
            <View style={[globalStyles.modalContainer, styles.modalContainer]}>
                <View style={styles.formContainer}>
                    <Text style={globalStyles.h1Style}>Group Preview</Text>

                    <Text style={globalStyles.textInputTitle}>Is group Public? </Text>
                    <Text style={globalStyles.pStyle}>
                        {group.public ? "Yes" : "No"}
                    </Text>

                    <Text style={globalStyles.textInputTitle}>Group Name</Text>
                    <Text style={[globalStyles.pStyle]}>{group.name}</Text>

                    <Text style={globalStyles.textInputTitle}>Created</Text>
                    <Text style={[globalStyles.pStyle]}>{moment(group.added).format("DD.MM.YYYY")}</Text>

                    <Text style={globalStyles.textInputTitle}>Group Description</Text>
                    <Text style={[globalStyles.pStyle]}>{group.groupdesc}</Text>

                    <Text style={globalStyles.textInputTitle}>Members</Text>
                    <Text style={[globalStyles.pStyle]}>{group.membercount}</Text>

                </View>
                    <ProblematorButton
                        title="close"
                        containerStyle={{ width: "100%" }}
                        onPress={() => {
                            this.setModalVisible(false);
                        }}>
                    </ProblematorButton>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        flex: 1,
    },
    modalContainer: {
        alignContent: 'center'
    },
})

const mapStateToProps = (state) => {
    return {
        groupDetails : state.groups.groupDetails,
        uiState: state.problems.uiState,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetGroup: (payload) => dispatch({ type: 'GROUP_SAGA', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditModalContent);
