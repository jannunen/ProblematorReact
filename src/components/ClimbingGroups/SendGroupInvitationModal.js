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

export class SendGroupInvitationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emails: [],
            invitationText: null,
            giveAdminRights: false,
        }
    }
    renderItem = ({ item }) => {
        return (
            <View style={{ width: "80%", flexDirection: 'row' }}>
                <Text style={{ flexGrow: 1, color: 'white', fontSize: 18 }}>{item}</Text>
                <TouchableOpacity onPress={() => this.removeEmail(item)}><FontAwesome name="minus-square" size={28} color="#decc00" /></TouchableOpacity>
            </View>
        )
    }
    removeEmail = (email) => {
        this.setState({ emails: this.state.emails.filter(item => item !== email) });
    }
    componentDidMount = () => {
        this.setState({
            modalVisible: this.props.visible,
            groupid: this.props.group.id,
            invitationText: "I would like you to join to our climbing group called " + this.props.group.name
        });
        console.log('cdm', this.state)
    }
    sendInvitations = () => {
        if (this.state.emails.length == 0) {
            alert("Please insert an email before trying to send the invitation");
            return;
        }
        this.props.onSendInvitations(this.state);

    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible: visible
        });
        this.props.onClose();
    }
    addEmail = () => {
        if (this.state.email == "") {
            alert("Please enter a valid email");
            return;
        }
        this.setState({ emails: [...this.state.emails, this.state.email], email: "" });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1 }}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}>

                <View style={[globalStyles.modalContainer, styles.modalContainer]}>
                    <View style={styles.formContainer}>
                        <Text style={globalStyles.h1Style}> Invite friends </Text>
                        <Text style={globalStyles.textInputTitle}>Invitation text</Text>
                        <TextInput
                            style={[globalStyles.textInput, styles.textInput]}
                            onChangeText={(text) => this.setState({ invitationText: text })}
                            multiline={true}
                            numberOfLines={3}
                            value={this.state.invitationText}
                        />
                        <Text style={globalStyles.textInputTitle}>Friend email(s) you would like to invite</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[globalStyles.textInput, styles.textInput]}
                                onChangeText={(text) => this.setState({ email: text })}
                                autoComplete="email"
                                autoCapitalize="none"
                                value={this.state.email}
                            />
                            <TouchableOpacity onPress={this.addEmail}><FontAwesome style={styles.addEmail} name="plus-square" color="#decc00" size={30} /></TouchableOpacity>
                        </View>
                        <Text style={globalStyles.textInputTitle}>Add admin rights for invitees</Text>
                        <CheckBox 
                        style={styles.checkBox}
                        isChecked={this.state.giveAdminRights}
                        onClick={() => this.setState({ giveAdminRights : !this.state.giveAdminRights})}
                        leftText={"Add admin rights"}
                        leftTextStyle={styles.checkBoxText}
                        checkBoxColor="#decc00"
                        />
                        
                        <ScrollView>
                            <FlatList data={this.state.emails} renderItem={this.renderItem} />
                        </ScrollView>
                        <View style={{ alignContent: 'center' }}>
                            <ProblematorButton onPress={this.sendInvitations} title="Send invitation(s)"
                                containerStyle={{ width: "100%" }}
                            />
                            <ProblematorButton
                                title="close"
                                containerStyle={{ width: "100%" }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                            </ProblematorButton>
                        </View>

                    </View>
                </View>
            </Modal>
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
    textInput: {
        flex: 1,
        marginRight: 10,
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
        onSendInvitations: (payload) => dispatch({ type: 'SEND_INVITATIONS_SAGA', payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendGroupInvitationModal);
