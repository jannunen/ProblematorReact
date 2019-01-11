import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import  Icon  from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { white } from 'ansi-colors';

export class ProblemDetails extends React.Component {


    leftRows = (p) => {

        return (
            <Row >
                <Text style={styles.bigGrade}> {p.gradename} </Text>
            </Row>
        );
     }

    rightRows = (p) => {
        return (
            <Row style={[styles.defaultCellStyle ]}>
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
        );
    }
    render() {
        return (
            <View style={styles.problemContainer}>
                <Grid>
                    <Col style={styles.leftColumn}>
                        {this.leftRows(this.props.problem)}
                    </Col>
                    <Col>
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
    defaultCellStyle: {
        padding : 8,
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