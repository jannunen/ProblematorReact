import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  SectionList,
  TouchableOpacity
} from 'react-native'

import { Col, Row, Grid } from "react-native-easy-grid";
import  Icon  from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import ProblematorButton from '../ProblematorButton/ProblematorButton';
import ProblematorIconButton from '../ProblematorIconButton/ProblematorIconButton';
import grades from '../../../config';

export class ProblemDetails extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            date:moment(),
            gradeOpinion  : null,
        }
      }

    handleAction = (actionType, problemid) => {

    }

    getPickerGrades = () => {
        return grades.map((item) => {
            return <Picker.Item label={item.name} value={item.id} />
        });
    }
    leftRows = (p) => {

        return (
            <View style={{ flex : 1}}>
            <Row >
                <Text style={styles.bigGrade}> {p.gradename} </Text>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle , {flexDirection : 'column'}]}>
                <Text style={styles.fieldName}>Start</Text><Text style={styles.fieldValue}>{p.startdefinition}</Text>
                <Text style={styles.fieldName}>End</Text><Text style={styles.fieldValue}>{p.enddefinition}</Text>
                <Text style={styles.fieldName}>Info</Text><Text style={styles.fieldValue}>{p.info}</Text>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle , {flexDirection : 'row'}]}>
                <Text style={styles.fieldHeader}>Tries</Text>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle , {flexDirection : 'row'}]}>
                <Text style={styles.fieldHeader}>Ascents total</Text>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle , {flexDirection : 'row'}]}>
                <ProblematorIconButton name="thumbs-up" onPress={this.handleAction('like',p.problemid)} />
                <ProblematorIconButton name="heart" onPress={this.handleAction('love',p.problemid)} />
                <ProblematorIconButton name="thumbs-down" onPress={this.handleAction('dislike',p.problemid)} />
            </Row>
            </View>
        );
     }

    rightRows = (p) => {
        return (
            <View style={{ flex : 1}}>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle ]}>
                <Grid>
                    <Row>
                    <View style={{ flex : 1, flexDirection : 'row',justifyContent : 'center'}}>
                        <Icon style={styles.likeIcon} name="ios-thumbs-up" size={20} color="#decc00" /><Text style={styles.likes}>{p.c_like}</Text><Text style={styles.tildeSeparator}>|</Text>
                        <Icon style={styles.likeIcon} name="ios-heart" size={20} color="red" /><Text style={styles.likes}>{p.c_love}</Text><Text style={styles.tildeSeparator}>|</Text>
                        <Icon style={styles.likeIcon} name="ios-thumbs-down" size={20} color="white" /><Text style={styles.likes}>{p.c_dislike}</Text>
                    </View>
                    </Row>
                    <Row>
                        <Text style={[styles.textCenter, styles.basicTextColor]}>by {p.author}</Text>
                    </Row>
                    <Row>
                        <Text style={[styles.textCenter, styles.basicTextColor]}>{p.addedrelative}</Text>
                    </Row>
                </Grid>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle ]}>
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
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle ]}>
                <Text style={styles.fieldHeader}>Grade opinion</Text>
                <Picker
                    selectedValue={this.state.gradeOpinion}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({gradeOpinion: itemValue})}>
                    {this.getPickerGrades}
                </Picker>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle ]}>
                <Text style={styles.fieldHeader}>Grade opinions</Text>
            </Row>
            <Row style={[styles.defaultCellStyle , styles.defaultRowStyle , {flexDirection : 'row'}]}>
                <ProblematorIconButton name="broom" onPress={this.handleAction('dirty',p.problemid)} />
                <ProblematorIconButton name="exclamation-triangle" onPress={this.handleAction('danger',p.problemid)} />
                <ProblematorIconButton name="comment-dots" onPress={this.handleAction('feedback',p.problemid)} />
            </Row>
           
</View>
        );
    }
    render() {
        return (
            <View style={styles.problemContainer}>
                <Grid>
                    <Col style={styles.leftColumn}>
                        {this.leftRows(this.props.problem)}
                    </Col>
                    <Col style={styles.rightColumn}>
                        {this.rightRows(this.props.problem)}
                    </Col>
                </Grid>
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
    }
});


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemDetails);