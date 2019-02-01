import React, { Component } from 'react'
import { View ,StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import  Icon  from 'react-native-vector-icons/Ionicons';

class LatestTicks extends React.Component {

    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
                <View style={styles.listItemContainer}>
                    <View style={styles.gradeContainer}>
                        <Text style={styles.gradeName}>{item.gradename}</Text>
                    </View>
                    <View style={styles.null}>
                        <Text style={[styles.colourCode, { backgroundColor: item.colourcode }]}> </Text>
                    </View>
                    <View style={styles.null}>
                        <Text style={styles.tagShort}>{item.tagshort}</Text>
                    </View>
                    <View style={{ flex : 1, flexDirection : 'column', paddingLeft : 8}}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.climberName}>{item.etunimi} {item.sukunimi}</Text>
                        </View>
                        <View style={styles.null}>
                            <Text style={styles.gymName}>{item.gymname}</Text>
                        </View>
                    </View>
                    <View>
                        <Text key={"arrowright" + item.problemid} style={styles.listItemRight}>
                            <Icon name="ios-arrow-forward" size={30} color="#decc00" />
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render = () => {
       return (
            <View>
                <FlatList
                    renderItem={this.renderItem}
                    data={this.props.ticks.map((item) => { return { ...item, key: item.etunimi + item.problemid }} )} 
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  listItemContainer: {
    paddingTop : 2,
    paddingLeft : 8,
    paddingBottom : 4,
    flex : 1,
    flexDirection : 'row',
    height : 40,
    width : "100%",
    borderColor : '#636169',
    borderBottomWidth : 1,
    justifyContent : 'space-between',
  },
  gradeContainer: {
    width : 35,
  },
    gradeName: {
        color: '#decc00',
        fontSize: 20
    },
    colourCode: {
    marginTop : 5,
    marginLeft : 4,
    width : 20,
    height : 20,
    borderRadius : 5,
    borderWidth : 1,
    borderColor : 'white',
    overflow : 'hidden'

    },
    tagShort: {
        color: 'white',
        textTransform : 'uppercase',
        paddingLeft : 4,
        fontSize : 20,
    },
    gymName: {
        color : '#d0d0d0',
        fontSize : 16,
    },
    climberName: {
        color : 'white',
        fontSize : 16,
    }

});

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestTicks)
