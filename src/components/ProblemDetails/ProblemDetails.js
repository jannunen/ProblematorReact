import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Linking,
  TouchableOpacity,
  Dimensions,
  ART
} from 'react-native'
const {
    Surface,
    Shape,
    Rectangle,
    Group
} = ART;

import  Icon  from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import ProblematorButton from '../ProblematorButton/ProblematorButton';
import ProblematorIconButton from '../ProblematorIconButton/ProblematorIconButton';
import Spinner from '../RNSpinner/RNSpinner';
import grades from '../../../config';
import ActionSheet from 'react-native-actionsheet'
import getIndexFromObj from '../../helpers/getIndexFromObj';
import BarChart from '../BarChart/BarChart';

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
        let payload = {id : this.props.problem.problemid};
        this.props.onGetProblem(payload);
    }
    openManageTicksActionSheet = () => {
        this.ActionSheet.show();
    }
    handleSelectBetavideo = (selectedIndex) => {
        if (selectedIndex == 0) {
            return;
        }
        const videos = this.props.probleminfos[this.props.problem.problemid].betavideos;
        const url = videos[selectedIndex-1].video_url;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              console.log("Don't know how to open URI: " + url);
            }
          });

    }
    handleOpenBetaVideos = () => {
        this.BetaVideosActionSheet.show();
    }
    handleMyTickDelete = (selectedIndex) => {
        if (selectedIndex == 0) {
        // Do nothing if cancel
            return;
        }
        selectedIndex--; // Because 0 is cancel.
        // Find tick to delete
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        const ticks = probInfo.myticklist;
        // This is an object, so we have to loop.
        counter = 0;
        let tickToDelete = null;
        for (var idx in ticks) {
            console.log("counter",counter,"idx",idx,"selectedIndex",selectedIndex);
            if (counter == selectedIndex) {
                tickToDelete = idx;
                break;
            }
            counter++;
        }
        console.log("del",tickToDelete);

        this.props.onTickDelete({tickid : tickToDelete, problemid :this.props.problem.problemid});

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
      let options = [ 'Cancel'];



        let manageTicks = <Text style={styles.myTicks}>Loading ticks...</Text>
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        if (probInfo!=null) {
            const ticks = probInfo.myticklist;
            let amt = Object.keys(ticks).length;
            if (ticks != null) {
                for (var idx in ticks) {
                    let tick = ticks[idx];
                    let time = moment(tick.tstamp).format("DD.MM.YYYY");
                    let tickStr = time + ": Tries: " + tick.tries;
                    if (tick.tries_bonus) {
                        tickStr += ", to bonus: " + tick.tries_bonus;
                    }
                    options.push(tickStr)
                }
            }
            manageTicks = <TouchableOpacity onPress={this.openManageTicksActionSheet}><Text style={styles.myTicks}>Manage {amt} tick(s)...</Text></TouchableOpacity>
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
                <ActionSheet
                ref={o => this.ActionSheet = o}
                title="Delete a tick by clicking on it (or cancel)"
                options={options}
                cancelButtonIndex={0}
                onPress={(index) => {this.handleMyTickDelete(index) }}
              />
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
                <Text style={styles.fieldHeader}>Grade opinion</Text>
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
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        let barChart = null;
        if (probInfo != null) {
            // create data
            const opinions = probInfo.gradedist;
 
            const data = opinions.map((data,idx) => { return {label : data.gradename, value: data.gradeamount }})

                barChart = <BarChart data={data} />;

        }
        const cellWidth = Math.round((Dimensions.get('window').width / 2)/10)*10;
          
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Grade opinions</Text>
            {barChart}
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
                    <ProblematorIconButton text="feedback" name="comment-dots" onPress={this.handleAction('feedback', p.problemid)} />
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
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        let betaVideoCount = 0;
        let betaVideosText = "0 betavideos";
        let optionsBetaVideos = ['Cancel'];
        if (probInfo != null) {
            console.log(probInfo);
            betaVideoCount = probInfo.betavideos == null ? 0 : probInfo.betavideos.length;
            betaVideosText = betaVideoCount + " betavideo(s)";
            let videos = probInfo.betavideos.map((val, idx) => "by "+val.sender.etunimi+" "+moment(val.added).fromNow());
            optionsBetaVideos = optionsBetaVideos.concat(videos);
        }
        return (
            <View style={styles.childCell}>
                <ProblematorButton  title={betaVideosText} onPress={this.handleOpenBetaVideos} />
                <ActionSheet
                ref={o => this.BetaVideosActionSheet = o}
                title="Choose a betavideo"
                options={optionsBetaVideos}
                cancelButtonIndex={0}
                onPress={(index) => {this.handleSelectBetavideo(index) }}
              />
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
    },
    gradeOpinionBarChartStyle : {

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
        onTickDelete: (payload) => dispatch({ type : 'DELETE_TICK_SAGA', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetails);
