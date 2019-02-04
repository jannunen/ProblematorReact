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
import LoadingState from '../LoadingState/LoadingState'

export class AllClimbingGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredGroups : this.props.groups,
      groupFilter : null,
    }
  }
  componentDidMount = () => {
    
  }
  handleItemClicked = (item) => {
      this.props.handleItemClicked(item);
  }
  listItem = (item, index ) => {
    return (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <View key={"lic" + item.id} style={styles.listItemContainer}>
          <View>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupMembers}>{item.usercount} member(s)</Text>
          </View>
          <View>
            <Text  style={styles.listItemRight}>
              <Icon name="ios-arrow-forward" size={30} color="#decc00" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  transFormGroupsToFlatList = () => {
    return this.props.groupSearchResults.map(item => { return { ...item, key: item.gid } });
  }
  searchFilterMyGroups = (text) => {
    this.setState({groupFilter : text.toLowerCase()}) 
    if (this.state.groupFilter != null && this.state.groupFilter.length >= 3) {
        this.props.onGroupSearch({ term : this.state.groupFilter})
    }
  }
  render() {
      let searchResultList = null;
      console.log("search results",this.props.groupSearchResults)
      if (this.state.groupFilter == null) {
          searchResultList = <Text style={styles.noResultsYet}>Start writing a group name and the search will be executed.</Text>
      } else if (this.props.uiState == 'loading') {
          searchResultList = <LoadingState>Searching...</LoadingState>

      } else if (this.props.groupSearchResults.length == 0 && this.state.groupFilter != null) {
          searchResultList = <Text style={styles.noResultsYet}>Search resulted 0 hits.</Text>
      } else {
          searchResultList = (
            <FlatList
            style={styles.groupList}
            renderItem={({ item, index, }) =>
                this.listItem(item, index )
            }
            keyExtractor={(item, index) => {
                const key = item['gid'] + "_" + index;
                return key;
            }}
                data={this.transFormGroupsToFlatList()}
            />
          );
        }
    return (
      <View style={{ flex: 1 }}>
        {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
        <SearchGroups title="Write a group name and click search, min. 3 chars" searchFilter={this.searchFilterMyGroups} />
        {searchResultList}
        </View>
      )
    }

  }

  const mapStateToProps = (state) => {
    return {
      groups: state.groups.groups,
      groupSearchResults : state.groups.groupSearchResults,
      pending: state.groups.pending,
      invitations: state.groups.invitations,
      uiState: state.problems.uiState,
      error: state.problems.error
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onGroupSearch: (payload) => dispatch({ type: 'SEARCH_GROUPS_SAGA', payload }),
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
      noResultsYet: {
          color: 'white',
          paddingTop : 10,
          paddingLeft : 10,
          fontSize: 14 ,

      }
    
  });

  export default connect(mapStateToProps, mapDispatchToProps)(AllClimbingGroups);



