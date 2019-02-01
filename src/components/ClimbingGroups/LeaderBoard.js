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

export class LeaderBoard extends Component {
  defineArrowDirection = (now, then) => {
      if (now == null || then == null) {
          return 'equal';
      }
  }
  directionArrow = (now, then) => {
      now = now  || 0;
console.log("now",now,then);
  }

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
            <Text style={styles.directionColText}>
            {this.directionArrow(item.rank.rankpoints, item.rank.lastrankpoints)} 
            </Text>
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
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
  },
  arrowCol: {
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
