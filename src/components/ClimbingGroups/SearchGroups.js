import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity
} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

export class SearchGroups extends React.Component {
    render = () => {
        return (<Text>Search groups</Text>)
    }
}

const mapStateToProps = (state) => {
  return {
    loading : state.problems.loading,
    error : state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroups);



