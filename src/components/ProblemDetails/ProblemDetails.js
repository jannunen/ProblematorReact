import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  SectionList,
  TouchableOpacity
} from 'react-native'

import  Icon  from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import ProblematorButton from '../ProblematorButton/ProblematorButton';
import ProblematorIconButton from '../ProblematorIconButton/ProblematorIconButton';
import Spinner from '../RNSpinner/RNSpinner';
import grades from '../../../config';
import { getProblem } from '../../store/actions/problems';

export class ProblemDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            date:moment(),
            gradeOpinion  : null,
            tries : 0,
        }
      }

    componentDidMount = () => {
        // Start loading total ascents
        // grade opinions
        // My tick info
        console.log("Dispatching saga request");

        let payload = {id : this.props.problem.problemid};
        console.log("sent",payload);
        this.props.onGetProblem(payload);
    }

    handleAction = (actionType, problemid) => {

    }

    getPickerGrades = () => {
        return grades.map((item) => {
            return <Picker.Item label={item.name} value={item.id} />
        });
    }

    gradeCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.bigGrade}> {p.gradename} </Text>
            </View>
        );
    }

    likeCell =(p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.tagShort}>{p.tagshort}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon style={styles.likeIcon} name="ios-thumbs-up" size={20} color="#decc00" /><Text style={styles.likes}>{p.c_like}</Text><Text style={styles.tildeSeparator}>|</Text>
                    <Icon style={styles.likeIcon} name="ios-heart" size={20} color="red" /><Text style={styles.likes}>{p.c_love}</Text><Text style={styles.tildeSeparator}>|</Text>
                    <Icon style={styles.likeIcon} name="ios-thumbs-down" size={20} color="white" /><Text style={styles.likes}>{p.c_dislike}</Text>
                </View>
                <Text style={[styles.textCenter, styles.basicTextColor]}>by {p.author}</Text>
                <Text style={[styles.textCenter, styles.basicTextColor]}>{p.addedrelative}</Text>
            </View>
        );
    }

    infoCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldName}>Start</Text><Text style={styles.fieldValue}>{p.startdefinition}</Text>
                <Text style={styles.fieldName}>End</Text><Text style={styles.fieldValue}>{p.enddefinition}</Text>
                <Text style={styles.fieldName}>Info</Text><Text style={styles.fieldValue}>{p.info}</Text>
            </View>
        )
    }

    ascentCell = (p) => {
        let manageTicks = <Text style={styles.myTicks}>Loading ticks...</Text>
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        if (probInfo!=null) {
            const ticks = probInfo.myticklist;
            let amt = Object.keys(ticks).length;
            manageTicks = <Text style={styles.myTicks}>Manage {amt} tick(s)...</Text>
        }
        return (
            <View style={styles.childCell}>
                <DatePicker 
                            date={this.state.date}
                            customStyles={{ dateText : { color : 'white'}}}
                            style={{ alignItems : 'center' }}
                            mode="date"
                            format="YYYY-MM-DD"
                            confirmBtnText="OK"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {this.setState({date: date})}}
                />
                <ProblematorButton title="Save tick" />
                {manageTicks}
            </View>
        )
    }

    triesCell = (p) => {
        return (
            <View style={[styles.childCell, { paddingTop : 10}]}>
                <Text style={styles.fieldHeader}>Tries</Text>
                <Spinner max={10}
                    min={1}
                    color="#252623"
                    showBorder={false}
                    numColor="#fff"
                    btnFontSize={30}
                    plusMinusStyle={styles.spinnerButtonPlusMinus}
                    buttonTextColor="white"
                    numBgColor="#30312e"
                    onNumChange={(num)=>{this.setState({ tries : num})}}
                    value={this.state.tries}
                    />
                    <ProblematorButton title="Add as todo" />
            </View> 
            );
    }

    gradeOpinionCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Grade opdjsaljdslkjinion</Text>
                <Picker
                    selectedValue={this.state.gradeOpinion}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ gradeOpinion: itemValue })}>
                    {this.getPickerGrades}
                </Picker>
            </View>
        );
    }

    ascentsTotalCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Ascents total</Text>
            </View>
        );
    }

    gradeOpinionsCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Grade opinions</Text>
            </View>
        );
    }

    likeLoveDislikeCell = (p) => {
        return (
            <View style={styles.childCell}>
                <View style={{ flexDirection : 'row'}}>
                    <ProblematorIconButton text="like" name="thumbs-up" onPress={this.handleAction('like',p.problemid)} />
                    <ProblematorIconButton text="love" name="heart" onPress={this.handleAction('love',p.problemid)} />
                    <ProblematorIconButton text="dislike" name="thumbs-down" onPress={this.handleAction('dislike',p.problemid)} />
                </View>
            </View>
        );
    }

    actionsCell = (p) => {
        return (
            <View style={styles.childCell}>
                <View style={{ flexDirection : 'row'}}>
                    <ProblematorIconButton text="dirty" name="wrench" onPress={this.handleAction('dirty', p.problemid)} />
                    <ProblematorIconButton text="dangerous" name="exclamation" onPress={this.handleAction('danger', p.problemid)} />
                    <ProblematorIconButton test="feedback" name="comment-dots" onPress={this.handleAction('feedback', p.problemid)} />
                </View>
            </View>
        );
    }
    
    totalAscentsCell = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Total ascents</Text>
            </View>
        );
    }

    betaVideosCellLeft = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Beta videos</Text>
            </View>
        );

    }

    betaVideosCellRight = (p) => {
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Submit betavideo</Text>
            </View>
        );
    }

    render() {
        const p = this.props.problem;
        return (
            <View style={styles.parent}>
                {this.gradeCell(p)}
                {this.likeCell(p)}
                {this.infoCell(p)}
                {this.ascentCell(p)}
                {this.triesCell(p)}
                {this.gradeOpinionCell(p)}
                {this.totalAscentsCell(p)}
                {this.gradeOpinionsCell(p)}
                {this.likeLoveDislikeCell(p)}
                {this.actionsCell(p)}
                {this.betaVideosCellLeft(p)}
                {this.betaVideosCellRight(p)}


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
    leftColumn :  {
        borderRightColor : '#2f302d',
        borderRightWidth : 1,
        padding : 8,
    },
    rightColumn :  {
        padding : 8,
    },
    parent : {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor : '#252623',
    },
    childCell: {
        flexBasis : '50%',
        height : '16%',
        padding : 12,
        borderRightColor : '#2f302d',
        borderRightWidth : 1,
        borderBottomColor : '#2f302d',
        borderBottomWidth : 1,
        alignItems : 'center',

    },
    fieldHeader: {
        textTransform: 'uppercase',
        color : '#636169',
        fontSize :18 
    },
    defaultRowStyle: {
        borderBottomColor : '#2f302d',
        borderBottomWidth : 1,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    defaultCellStyle: {
        padding : 8,
    },
    fieldName : {
        color : 'white',
    },
    fieldValue : {
        color : '#636169',

    },
    bigGrade : {
        fontSize : 80,
        fontWeight : 'bold',
        color : 'white',
    },
    likesInfoContainer: {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    textCenter: {
        textAlign : 'center',
        width : '100%'
    },
    basicTextColor : {
        color : '#efefef'
    },
    likes: {
        color : 'white',
    },
    tildeSeparator: {
        color : '#2f302d',
    },
    spinnerButton: {
        

    },
    spinnerButtonPlusMinus: {
        fontWeight : 'bold',
        fontSize : 35,
        color : 'white',
        paddingTop : 0,
        marginTop : -10,
    },
    tagShort: {
        fontSize : 28,
        color : '#e0e0e0',
    },
    myTicks: {
        color : "#decc00",
        fontSize : 14,
        textTransform: 'uppercase',
    }
});


const mapStateToProps = (state) => {
    return {
        probleminfos : state.problems.probleminfos 
       }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetProblem: (payload) => dispatch({ type : 'GET_PROBLEM_SAGA', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetails);
