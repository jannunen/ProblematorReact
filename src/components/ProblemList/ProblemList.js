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
import { getProblems } from '../../store/actions/index';
import { red } from 'ansi-colors';

export class ProblemList extends React.Component {

    componentDidMount = () => {
        this.props.onLoadProblems();
    }

  transformProblemsToSections = () => {
    let sections = [];
    if (this.props.problems) {
      for (var idx in this.props.problems) {
        var item = this.props.problems[idx];
        sections.push({ title: idx, data: item.problems.map((item) => { return ({ ...item }) }) });
      };
    }
    if (sections == null) {
      sections = [({ title : 'Loading...', data : ['Loading']})];
    }
    return sections;
  }

  handleItemClicked = (item) => {
      this.props.handleItemClicked(item);
  }

  listItem = (item, index, section) => {
    return  (
      <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
        <View key={"lic" + item.problemid} style={styles.listItemContainer}>
          <Text key={"grade" + item.problemid} style={styles.listItemLeft}>{item.gradename}</Text>
          <Text key={"color" + item.problemid} style={[styles.listItemColor, { backgroundColor: item.htmlcode }]}> </Text>
          <Text key={"tag" + item.problemid} style={[styles.listItemTag]}>{item.tagshort}</Text>
          <View key={"ric " + item.problemid} style={styles.routeInfoContainer}>
            <Text key={"text" + item.problemid} style={styles.listItemText} key={index}>
              {item.startdefinition} | {item.enddefinition}
            </Text>
            <Text key={"author" + item.problemid} style={[styles.listItemText, styles.listItemRoutesetter]} >
              by {item.author} {item.addedrelative}
            </Text>
          </View>
          <Text key={"stars" + item.problemid} style={styles.listItemStars}>
            <Icon style={styles.likeIcon} name="ios-thumbs-up" size={20} color="#decc00" /><Text style={styles.likes}>{item.c_like}</Text>
            <Icon style={styles.likeIcon} name="ios-heart" size={20} color="red" /> <Text style={styles.likes}>{item.c_love}</Text>
          </Text>
          <Text key={"arrowright" + item.problemid} style={styles.listItemRight}>
            <Icon name="ios-arrow-forward" size={30} color="#decc00" />
          </Text>
        </View>
      </TouchableOpacity>
      );
  }

    render() {
        return (
          <View style={{flex : 1}}>
          {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
            <SectionList 
            style={styles.problemList}
            updateCellsBatchingPeriod={50}   
            maxToRenderPerBatch={100}
            renderItem={({item, index, section}) => 
                this.listItem (item, index, section)
            } 
            renderSectionHeader={({section: {title}}) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            keyExtractor={(item, index) => {
                const key= item['problemid']+"_"+index;
                return key;
            }}
            sections={this.transformProblemsToSections()}
            />
          </View>
        )
    }

}


const styles= StyleSheet.create({
  problemList: {
    backgroundColor: "#30312e",
  },
  likeIcon: {
    marginTop : 2
  },
  likes: {
    color : "white",
    marginRight : 3,
    paddingRight : 3,
  },
  listItemLeft : {
    fontSize : 23,
    alignItems : 'center',
    fontWeight : 'bold',
    paddingTop : 6,
    paddingLeft : 2,
    paddingRight : 6,
    color : 'white',
    width : 50,
  },
  listItemColor: {
    marginTop : 11,
    marginLeft : 4,
    width : 15,
    height : 15,
    borderRadius : 5,
    borderWidth : 1,
    borderColor : 'white',
    overflow : 'hidden'
  },
  listItemRight: {
    alignSelf : 'flex-end',
    paddingRight : 8
  },
  listItemTag: {
    fontWeight : 'normal',
    fontSize : 20,
    color : 'white',
    marginTop : 6,
    marginLeft : 2
  },
  listItemRoutesetter: {
    color : '#c0c0c0',
  },
  listItemText : {
    paddingTop : 2,
    paddingLeft : 4,
    color : 'white',
  },
  sectionHeader: {
   height : 34,
    backgroundColor : "#eee",
    fontSize : 20,
    paddingLeft : 8,
    paddingTop : 4,
  },
  routeInfoContainer: {
    alignItems : 'stretch',
    flexDirection : 'column',
    flex : 1

  },
  listItemStars: {
    color : '#decc00',
    fontWeight : 'bold',
    fontSize : 18 ,
    marginTop : 8,
    marginRight : 8
  },
  listItemContainer: {
    flex : 1,
    flexDirection : 'row',
    width : "100%",
    borderColor : 'black',
    borderBottomWidth : 1,
    alignItems : 'stretch',
    height : 40,
  },
  errorMessage: {
    color : 'red',
    fontSize : 18,
    padding : 4,
  }
});


const mapStateToProps = (state) => {
  return {
    problems : state.problems.problems,
    loading : state.problems.loading,
    error : state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProblems: () => dispatch(getProblems()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList);