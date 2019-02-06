import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import globalStyles from '../../styles/global'
import moment from 'moment';

export class MyCompetitions extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
        this.props.onLoadMyComps();
    }
    handleItemClicked = (comp) => {
        // Navigate to comp
        this.props.handleItemClicked(comp);
    }
    renderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => this.handleItemClicked(item)}>
                <View key={"lic" + item.problemid} style={globalStyles.listItemContainer}>
                    <Text style={styles.listItemLeft}>{moment(item.compdate).format("DD.MM.YYYY")}</Text>
                    <Text style={[styles.listContenders]}> <FontAwesome name="users" size={20} color="white" />{item.usercount}</Text>
                    <View style={styles.routeInfoContainer}>
                        <View style={globalStyles.flexVertical}>
                            <Text style={[styles.compName]}>{item.name}</Text>
                            <Text style={[styles.compVenueOpens]}>Venue opens: {moment(item.compdate).format("HH:mm")}</Text>
                        </View>

                    </View>

                    <Text style={styles.listItemRight}>
                        <Icon name="ios-arrow-forward" size={30} color="#decc00" />
                    </Text>
                </View>
            </TouchableOpacity>

        );
    }
    transFormToFlatList = () => {
        return this.props.myComps.map(item => { return { ...item, key: item.compid } });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.error != null ? <Text style={styles.errorMessage}>Error: {this.props.error}</Text> : null}
                <FlatList
                    style={styles.groupList}
                    renderItem={({ item, index, }) =>
                        this.renderItem(item, index)
                    }
                    keyExtractor={(item, index) => {
                        const key = item['gid'] + "_" + index;
                        return key;
                    }}
                    data={this.transFormToFlatList()}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        myComps: state.comps.myComps,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadMyComps: (payload) => dispatch({ type: 'MY_COMPS_SAGA', payload: payload }),
    }
}

const styles = StyleSheet.create({
    listItemLeft: {
        color: 'white',
        fontSize: 16,
    },
    listContenders: {
        color: 'white',
        fontSize: 16,
    },
    compName: {
        color: 'white',
        fontSize: 14,
    },
    compVenueOpens: {
        color: '#d0d0d0',
        fontSize: 14,
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(MyCompetitions)
