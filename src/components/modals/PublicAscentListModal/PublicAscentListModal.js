import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  ART
} from 'react-native'
import { connect } from 'react-redux';
import moment from 'moment';

import ProblematorButton from '../../ProblematorButton/ProblematorButton';
import { GRADES} from '../../../../config';

export class PublicAscentListModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible : this.props.visible
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            modalVisible : visible
        });
        this.props.onClose();
    }

    componentDidMount = () => {
        this.props.onGlobalAscents({ problemid: this.props.problemid });
    }
    calcRoughGrade = (points) => {
        points = parseInt(points);
        let grade = "N/A";
        if (points == null) {
            return grade;
        }
        const scoreKeys = Object.keys(GRADES);
        for (let idx in scoreKeys) {
            const scoreItem = GRADES[idx];
            if (scoreItem != undefined) {
                let top10 = parseInt(scoreItem['score']) * 10;
                // TODO: Grade customization. Vermin, Australian, YDS
                if (points < top10) {
                    grade = scoreItem.font;
                    break;
                }
            }
        }
        return grade;

    }

    render = () => {

        let ascents = null;
        if (this.props.globalAscents[this.props.problemid] != null) {
            ascents = this.props.globalAscents[this.props.problemid];
        };
        let globalAscentCount = 0;
        let globalAscentsList = <ActivityIndicator color="#fff" />;
        if (ascents != null) {
            globalAscentsList = ascents.map((item,idx) => {
                const roughGrade = this.calcRoughGrade(item.problemator_top10_1y);
                const back = moment(item.tstamp).format("DD.MM.YYYY");
                return <Text key={item.tstamp + idx} style={styles.globalAscentListRow}>{item.etunimi} {item.sukunimi}
                 <Text style={{color : "#decc00", paddingLeft : 5, paddingRight : 5}}> @{roughGrade} </Text>
                  @{back}, tries: {item.tries} {item.tries_bonus != 0? "to bonus: " + item.tries_bonus : null}</Text>;
            })
            globalAscentCount = ascents.length;
        } 

        return ( 
            <Modal
                animationType="slide"
                transparent={false}
                style={{ flex: 1 }}
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalAscentsContainer}>
                    <View style={{ flex: 1, flexGrow: 1, marginTop: 40, marginRight: 0, padding: 16 }}>
                        <Text style={styles.modalTitle}>Public ascent list</Text>
                        <Text style={styles.modalSubTitle}>{globalAscentCount} ascent(s)</Text>
                        <ScrollView>
                            {globalAscentsList}
                        </ScrollView>
                    </View>
                    <View style={{ alignContent: 'center' }}>
                        <ProblematorButton
                            title="close"
                            containerStyle={{ width: "100%" }}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                        </ProblematorButton>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalAscentsContainer: {
        backgroundColor: '#252623',
        flex: 1,
        margin: 0,
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: 22
    },
    modalTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 28
    },
    modalSubTitle: {
        color: '#decc00',
        marginBottom: 8,
        textTransform: 'uppercase',
        fontSize: 20
    },
    globalAscentListRow: {
        color: 'white',

    }
});

const mapStateToProps = (state) => {
    return {
        globalAscents : state.problems.globalAscents 
       }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGlobalAscents: (payload) => dispatch({ type : 'GET_GLOBAL_ASCENTS', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicAscentListModal);

