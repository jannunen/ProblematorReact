import React, { Component } from 'react'
import { 
    View, 
    Text ,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import  Icon  from 'react-native-vector-icons/Ionicons';

const DirectionArrow = (props) => {
    const defineArrowDirection = (now, then) => {
        if (now == null || then == null) {
            return 'equal';
        }
        if (now < then) {
            return 'down';
        }
        if (now > then) {
            return 'up';
        }
        return 'equal';
    }

    const { now, then } = props;
    const arrowIcons = {
        'up': { name: 'chevron-up', color: '#00ff11' },
        'down': { name: 'chevron-down', color: '#ef3f0e' },
        'equal': { name: 'equals', color: 'white' }
    }
    const icon = arrowIcons[defineArrowDirection(now, then)];
    return (<FontAwesome style={styles.directionColText} name={icon.name} color={icon.color} size={16} ></FontAwesome>)
}


export class LeaderBoard extends Component {
  listItem = (item, index ) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <View key={"lic" + item.uid} style={styles.listItemContainer}>
          <View style={styles.standingCol}>
            <Text style={styles.standingColText}>{item.rank.rank}</Text>
          </View>
          <View style={styles.groupLeaderCol}>
            <Text style={styles.groupLeaderText}>{item.etunimi} {item.sukunimi}</Text>
          </View>
          <View style={styles.pointsCol}>
            <Text style={styles.pointsColText}>{item.rank.rankpoints}</Text>
          </View>
          <View style={styles.directionCol}>
                <DirectionArrow now={item.rank.rankpoints} then={item.rank.lastrankpoints}  />
          </View>
          <View>
            <Text key={"arrowright" + item.problemid} style={styles.listItemRight}>
              <Icon name="ios-arrow-forward" size={30} color="#decc00" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  transFormDataToFlatList = () => {
    return this.props.data.map(item => { return { ...item, key: item.uid } });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
        <FlatList
          style={styles.groupList}
          renderItem={({ item, index, }) =>
            this.listItem(item, index )
          }
          keyExtractor={(item, index) => {
            const key = item['gid'] + "_" + index;
            return key;
          }}
          data={this.transFormDataToFlatList()}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  groupList: {
    backgroundColor: "#30312e",
  },
  listItemContainer: {
    paddingTop : 4,
    paddingLeft : 8,
    paddingBottom : 8,
    flex : 1,
    flexDirection : 'row',
    width : "100%",
    borderColor : '#636169',
    borderBottomWidth : 1,
    justifyContent : 'space-between',
    height : 36,
  },
  listItemRight: {
    alignSelf : 'flex-end',
    paddingRight : 8
  },
  standingCol: {
  },
  standingColText: {
      color : '#decc00',
      fontSize : 18,
  },
  groupLeaderCol: {
      flexGrow : 1,
  },
  groupLeaderText: {
      color : 'white',
      fontSize : 18,
      paddingLeft : 10,
  },
  pointsCol: {
  },
  pointsColText: {
      color : '#decc00',
      fontSize : 20,
      fontWeight : 'bold',
      paddingRight : 10,
  },
  directionCol : {
  },
  directionColText : {
      paddingTop : 5,
      paddingRight : 8,
      paddingLeft : 2,
  },
  arrowCol: {
  },
});


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
