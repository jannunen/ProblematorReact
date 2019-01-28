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
import RNPickerSelect from 'react-native-picker-select';
import { GRADES } from '../../../config';
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
            showGlobalAscentListModal: false
        }
      }

    componentDidMount = () => {
        let payload = {id : this.props.problem.problemid};
        this.props.onGetProblem(payload);
    }
    openManageTicksActionSheet = () => {
        this.ActionSheet.show();
    }
    setModalVisible(visible) {
        console.log("setting modal visibility");
        if (visible) {
        console.log("dispatching global ascents");
            this.props.onGlobalAscents({ problemid: this.props.problem.problemid });
        }
        this.setState({showGlobalAscentListModal: visible});
    }
    calcRoughGrade = (points) => {
        return "7C";
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

    /** Returns the picker grades. Note: Makes grades uppercase,
     * if the problem type is boulder
     */
    getPickerGrades = () => {
        
        const pickerGrades =  Object.keys(GRADES).map((key, index) => {
            let g = GRADES[key].name;
            if ("boulder" === this.props.problem.routetype) {
                g = g.toUpperCase(); 
            }
            return {label : g, value: GRADES[key].id};
        });
        return pickerGrades;
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
            if (ticks != null && Object.keys(ticks).length > 0) {
                for (var idx in ticks) {
                    let tick = ticks[idx];
                    let time = moment(tick.tstamp).format("DD.MM.YYYY");
                    let tickStr = time + ": Tries: " + tick.tries;
                    if (tick.tries_bonus) {
                        tickStr += ", to bonus: " + tick.tries_bonus;
                    }
                    options.push(tickStr)
                }
                manageTicks = <TouchableOpacity onPress={this.openManageTicksActionSheet}><Text style={styles.myTicks}>Manage {amt} tick(s)...</Text></TouchableOpacity>
            } else {
                manageTicks = null;
            }
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

        const pickerSelectStyles = StyleSheet.create({
            inputIOS: {
                paddingTop : 8,
                fontSize: 18,
                paddingTop: 10,
                textAlign : 'center',
                paddingHorizontal: 10,
                paddingBottom: 10,
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: '#252623',
                color: '#decc00',
            },
            inputAndroid: {
                paddingTop : 8,
                fontSize: 18,
                paddingTop: 10,
                paddingHorizontal: 10,
                paddingBottom: 10,
                textAlign : 'center',
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: '#252623',
                color: '#decc00',
            },
        });
        const items = [
            {
                label: 'Red',
                value: 'red',
            },
            {
                label: 'Orange',
                value: 'orange',
            }
        ];
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Grade opinion</Text>
            <RNPickerSelect
                    placeholder={{
                        label: 'Grade opinion...',
                        value: null,
                        color: '#decc00',
                    }}
                    items={this.getPickerGrades()}
                    onValueChange={(value) => {
                        this.setState({
                            gradeOpinion: value,
                        });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.gradeOpinion == null ? this.props.problem.gradeid : this.state.gradeOpinion}
                />

            </View>
        );
    }


    gradeOpinionsCell = (p) => {
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        let barChart = null;
        if (probInfo != null) {
            // create data
            const opinions = probInfo.gradedist;
            let data = null;
            if (opinions != null && opinions.length != undefined) {
                data = opinions.map((data,idx) => { return {label : data.gradename, value: data.gradeamount }})
                barChart = <BarChart data={data} />;
            } else {
                barChart = <Text>No differing opinions.</Text>;
            
            }

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
        const probInfo = this.props.probleminfos[this.props.problem.problemid];
        let ascentcount = <ActivityIndicator size="small" color="#fff" />;
        if (probInfo != null) {
            ascentcount = <Text style={styles.ascentCount}>{probInfo.ascentcount}</Text>;
        }
        return (
            <View style={styles.childCell}>
                <Text style={styles.fieldHeader}>Ascents total</Text>
                {ascentcount}
                <TouchableOpacity><Text style={styles.linkText} onPress={() => { this.setModalVisible(true)} }>Show ascents...</Text></TouchableOpacity>
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
        let globalAscentsList = <ActivityIndicator color="#fff" />;
        const globalAscents = this.props.globalAscents;
        console.log("gA",globalAscents);
        let globalAscentCount = 0;
        if (globalAscents[p.problemid] != null) {
            globalAscentsList = globalAscents[p.problemid].map((item,idx) => {
                const roughGrade = this.calcRoughGrade(item.problemator_top10_1y);
                const back = moment(item.tstamp).format("DD.MM.YYYY");
                return <Text key={item.tstamp + idx} style={styles.globalAscentListRow}>{item.etunimi} {item.sukunimi}
                 <Text style={{color : "#decc00", paddingLeft : 5, paddingRight : 5}}> {roughGrade} </Text>
                  @{back}, tries: {item.tries} {item.tries_bonus != 0? "to bonus: " + item.tries_bonus : null}</Text>;
            })
            globalAscentCount = globalAscents[p.problemid].length;
        } 
        return (
            <View style={styles.parent}>
            <Modal
            animationType="slide"
            transparent={false}
            style={{ flex : 1}}
            visible={this.state.showGlobalAscentListModal}
            onRequestClose={() => {

              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalAscentsContainer}>
                <View style={{ flex : 1 , flexGrow : 1, marginTop : 40, marginRight : 0, padding : 16}}>
                    <Text style={styles.modalTitle}>Public ascent list</Text>
                    <Text style={styles.modalSubTitle}>{globalAscentCount} ascent(s)</Text>
                    <ScrollView>
                        {globalAscentsList}
                    </ScrollView>
                </View> 
                <View style={{alignContent : 'center'}}>
                    <ProblematorButton
                    title="close"
                    containerStyle={{ width : "100%"}}
                    onPress={() => {
                        this.setModalVisible(!this.state.showGlobalAscentListModal);
                    }}>
                    </ProblematorButton>
                </View>
            </View>
          </Modal>

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
    ascentCount: {
        fontSize : 30,
        fontWeight : 'bold',
        color : 'white',
    },
    linkText : {
        color : '#decc00',
        textTransform: 'uppercase',
    },
    modalAscentsContainer: { 
        backgroundColor : '#252623',
        flex: 1, 
        margin :0,
        justifyContent: 'space-between', 
        flexDirection: 'column', 
        marginTop: 22 
    },
    modalTitle: {
        color : 'white',
        textTransform: 'uppercase',
        fontSize : 28
    },
    modalSubTitle: {
        color : '#decc00',
        marginBottom : 8,
        textTransform: 'uppercase',
        fontSize : 20
    },
    globalAscentListRow: {
        color : 'white',

    }
});


const mapStateToProps = (state) => {
    return {
        probleminfos : state.problems.probleminfos,
        globalAscents : state.problems.globalAscents 
       }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetProblem: (payload) => dispatch({ type : 'GET_PROBLEM_SAGA', payload}),
        onTickDelete: (payload) => dispatch({ type : 'DELETE_TICK_SAGA', payload}),
        onGlobalAscents: (payload) => dispatch({ type : 'GET_GLOBAL_ASCENTS', payload}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetails);
