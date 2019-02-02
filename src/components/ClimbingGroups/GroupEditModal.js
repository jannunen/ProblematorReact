import React, { Component } from 'react'
import { 
    Text, 
    View, 
    TextInput,
    StyleSheet,
    FlatList,
    Alert,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import globalStyles from '../../styles/global'
import { connect } from 'react-redux';
import ProblematorButton from '../ProblematorButton/ProblematorButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export class GroupEditModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : null,
            groupid : null,
            groupdesc : null,
            public : false,
        }
    }
    componentDidMount = () => {
        console.log("group",this.props.group);
        this.setState({
            name : this.props.group.name,
            groupid : this.props.group.id,
            groupdesc : this.props.group.groupdesc,
            public : this.props.group.public == "1",
            allowjoin : this.props.group.allowjoin == "1",
        });
    }
    setModalVisible = (visible) => {
        this.props.onClose();
    }
    saveGroup = () => {
        this.props.onSaveGroup(this.state);
    }

    render() {
        return (
                <View style={[globalStyles.modalContainer, styles.modalContainer]}>
                    <View style={styles.formContainer}>

                        <Text style={globalStyles.h1Style}>Edit group</Text>
                        <CheckBox 
                        isChecked={this.state.allowjoin}
                        onClick={() => this.setState({ allowjoin : !this.state.allowjoin})}
                        leftText={"Allow people join? If not, they have to be invited."}
                        leftTextStyle={styles.checkBoxText}
                        checkBoxColor="#decc00"
                        />

                        <CheckBox 
                        isChecked={this.state.public}
                        onClick={() => this.setState({ public : !this.state.public})}
                        leftText={"Is group public?"}
                        leftTextStyle={styles.checkBoxText}
                        checkBoxColor="#decc00"
                        />

                        <Text style={globalStyles.textInputTitle}>Group Name</Text>
                        <TextInput
                            style={[globalStyles.textInput, styles.textInput]}
                            onChangeText={(text) => this.setState({ name: text })}
                            multiline={false}
                            value={this.state.name}
                        />
                        <View style={{flex : 1}}>
                            <Text style={globalStyles.textInputTitle}>Group Description</Text>
                            <TextInput
                                style={[globalStyles.textInput, styles.textInput]}
                                onChangeText={(text) => this.setState({ groupdesc: text })}
                                multiline={true}
                                numberOfLines={3}
                                value={this.state.groupdesc}
                            />
                        </View> 
                        <View style={{ alignContent: 'center' }}>
                            <ProblematorButton 
                                showLoading={this.props.uiState==='loading'}
                            onPress={this.saveGroup} title="Save"
                                containerStyle={{ width: "100%" }}
                            />
                            <ProblematorButton
                                title="close"
                                containerStyle={{ width: "100%" }}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                            </ProblematorButton>
                        </View>
                    </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        flex : 1,
    },
    modalContainer: {
        alignContent: 'center'
    },
    textInput: {
        marginRight: 10,
        height : 30,
    },
    addEmail: {
        padding: 6,
        fontWeight: 'bold',
    },
    checkBox: {
        width : 20,
        height : 20,
    },
    checkBoxText: {
        color : 'white',
        fontSize : 18,
        paddingTop : 8,
    }
})

const mapStateToProps = (state) => {
    return {
        uiState: state.problems.uiState,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveGroup: (payload) => dispatch({ type: 'SAVE_GROUP_SAGA', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditModalContent);
