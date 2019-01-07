import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  SectionList
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import  Icon  from 'react-native-vector-icons/Ionicons';

import {Navigation} from 'react-native-navigation';
import { connect } from 'react-redux';

import { goToAuth } from '../../navigation'
import { USER_KEY } from '../../../../config'
import { getProblems, selectGym } from '../../../store/actions/index';


const FirstRoute = (props) => {

  this.props = props;
transformProblemsToSections = () => {
  let sections = [];
  if (this.props.problems) {
    for (var idx in this.props.problems) {
      var item = this.props.problems[idx];
      sections.push({ title : idx, data : item.problems.map((item) => { return ({...item})})});
      };
  }
  return sections;
}

  listItem = (item, index, section) => {
    return  (
    <View key={"lic" + item.problemid} style={styles.listItemContainer}>
      <Text key={"grade"+item.problemid} style={styles.listItemLeft}>{item.gradename}</Text>
      <Text key={"color"+item.problemid} style={[styles.listItemColor, { backgroundColor : item.htmlcode }]}> </Text>
      <Text key={"tag"+item.problemid} style={[styles.listItemTag]}>{item.tagshort}</Text>
        <View key={"ric " +item.problemid} style={styles.routeInfoContainer}>
          <Text key={"text"+item.problemid}  style={styles.listItemText} key={index}>
          {item.startdefinition} | {item.enddefinition}
          </Text>
          <Text key={"author"+item.problemid}  style={[styles.listItemText, styles.listItemRoutesetter]} >
            by {item.author} {item.addedrelative}
        </Text>
      </View>
      <Text key={"stars"+item.problemid}  style={styles.listItemStars}>
        <Icon style={styles.likeIcon} name="ios-thumbs-up" size={20} color="#decc00" /><Text style={styles.likes}>{item.c_like}</Text> 
        <Icon style={styles.likeIcon} name="ios-heart" size={20} color="red" /> <Text style={styles.likes}>{item.c_love}</Text>
      </Text>
      <Text key={"arrowright"+item.problemid} style={styles.listItemRight}>
        <Icon name="ios-arrow-forward" size={30} color="#decc00" />
      </Text>
      </View>);
  }

  let list =  (
    <SectionList 
    style={styles.problemList}
      renderItem={({item, index, section}) => 
        listItem (item, index, section)
      } 
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      keyExtractor={(item, index) => {
        const key= item['problemid']+"_"+index;
        return key;
      }}
      sections={this.transformProblemsToSections()}
    />);

  return (<View style={[styles.scene, { backgroundColor: '#ff4081' }]} >
    {list}
  </View>
  );
};
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
  <Text>T4est2</Text>
  </View>
);


class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'List' },
      { key: 'second', title: 'Map' },
    ],
    problemsLoaded : false
  };
  componentDidMount = () => {
    // Go ahead and fetch the problems
    this.props.onLoadProblems();
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Problems'
        },
      }
    };
  }
  logout = async () => {
    this.setState({
      code : null
    })
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  render() {
    
    if (this.props.loading) {
      console.log("loading");
    } else {
      console.log("not anymore");

    }
    
    return (
        <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => {return FirstRoute(this.props)},
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}
/*
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'com.padadise.OtherScreen',
              }
            });
          }}
          title="View next screen"
        />

        */

const styles = StyleSheet.create({
  likeIcon: {
    marginTop : 2
  },
  likes: {
    color : "white",
    marginRight : 3,
    paddingRight : 3,
  },
  problemList: {
    backgroundColor: "#30312e",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: {
   height : 34,
    backgroundColor : "#eee",
    fontSize : 20,
    paddingLeft : 8,
    marginTop : 4,
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
  scene: {
    flex: 1,
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
  }

})

const mapStateToProps = (state) => {
  return {
    problems : state.problems.problems,
    loading : state.problems.loading,
    error : state.problems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProblems : () => dispatch(getProblems()),
    onSelectGym : gymid => dispatch(selectGym(gymid))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);