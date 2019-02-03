import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import globalStyles from '../../styles/global'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export class SearchGroups extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
    }
  }
  searchFilter = (text) => {
    this.setState({ filter : text})
    this.props.searchFilter(text);
  }
    render = () => {
        return (
          <View>
            <Text style={globalStyles.textInputTitle}>Filter groups</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight : 10 }}>
                <TextInput
                  style={globalStyles.textInput}
                  onChangeText={(text) => this.searchFilter(text)}
                  autoCorrect={false}
                  multiline={false}
                  value={this.state.filter}
                />
              </View>
              <View style={{ paddingTop : 4, paddingRight : 4}}>
                <TouchableOpacity onPress={() => this.searchFilter("")}>
                  <FontAwesome name="times" color="#decc00" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>)
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



