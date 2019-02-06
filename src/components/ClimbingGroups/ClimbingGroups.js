import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import SearchGroups from './SearchGroups'
import SearchGroupHits from './SearchGroupHits'

export class ClimbingGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredGroups : this.props.groups,
    }
  }
  componentDidMount = () => {
    
  }
  handleItemClicked = (item) => {
      this.props.handleItemClicked(item);
  }
  renderItem = (item, index ) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <View key={"lic" + item.gid} style={styles.listItemContainer}>
          <View style={styles.groupInfoRow}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupMembers}>{item.usercount} member(s)</Text>
          </View>
          <View style={styles.groupLeaderCell}>
            <Text style={styles.groupLeader}><FontAwesome name="trophy" color="#decc00" /> {item.leaderboulder.etunimi} {item.leaderboulder.sukunimi} {item.leaderboulder.rankpoints}</Text>
            <Text style={styles.groupLeader}><FontAwesome name="trophy" color="#decc00" /> {item.leadersport.etunimi} {item.leadersport.sukunimi} {item.leadersport.rankpoints}</Text>
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
  transFormGroupsToFlatList = () => {
    const term = this.state.groupFilter;
    const g = this.props.groups.map(item => { return { ...item, key: item.gid } });
    if (this.state.groupFilter != null && "" != this.state.groupFilter) {
      return g.filter(item => item.name.toLowerCase().indexOf(term) != -1);
    }
    return g;
  }
  searchFilterMyGroups = (text) => {
    this.setState({groupFilter : text.toLowerCase()}) 
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
        <SearchGroups searchFilter={this.searchFilterMyGroups} />
        <FlatList
          style={styles.groupList}
          renderItem={({ item, index, }) =>
            this.renderItem(item, index )
          }
          keyExtractor={(item, index) => {
            const key = item['gid'] + "_" + index;
            return key;
          }}
            data={this.transFormGroupsToFlatList()}
          />
        </View>
      )
    }

  }

  const mapStateToProps = (state) => {
    return {
      groups: state.groups.groups,
      pending: state.groups.pending,
      invitations: state.groups.invitations,
      loading: state.problems.loading,
      error: state.problems.error
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    }
  }
  const styles = StyleSheet.create({
    groupList: {
      backgroundColor: "#30312e",
    },
    listItemContainer: {
      paddingTop : 4,
      paddingLeft : 2,
      paddingBottom : 4,
      flex : 1,
      flexDirection : 'row',
      width : "100%",
      borderColor : '#636169',
      borderBottomWidth : 1,
      justifyContent : 'space-between',
      height : 47,
    },
    listItemRight: {
      alignSelf : 'flex-end',
      paddingRight : 8
    },
    groupName: {
      fontWeight : 'bold',
      color : 'white',
      fontSize : 20,
    },
    groupMembers: {
      color : '#d0d0d0',
      paddingBottom : 4,
    },
    groupInfoRow: {
      width : "30%",
    },
    groupLeaderCell: {
      flexGrow : 1,

    },
    groupLeader : {
      color : 'white',
    }
    
  });

  export default connect(mapStateToProps, mapDispatchToProps)(ClimbingGroups);



