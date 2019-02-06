import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import globalStyles from '../../styles/global'
import LoadingState from '../LoadingState/LoadingState';

export class MyCompSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        //this.props.onLoadCompetition({ compid : this.props.comp.compid })
    }

    render() {
        if (this.props.comps.length == 0 || this.props.comps[this.props.comp.compid] == null ) {
            return <LoadingState>Loading competition...</LoadingState>
        }
        const comp = this.props.comps[this.props.comp.compid];

    return (
        <View>
            <Text style={globalStyles.h1Style}>{this.props.comp.name}</Text>
            <Text style={globalStyles.h2Style}>{this.props.comp.compdate}</Text>
            <Text style={globalStyles.h2Style}>{this.props.comp.usercount} contender(s)</Text>
        </View>
    )
  }
}



const mapStateToProps = (state) => {
    return {
        comps : state.comps.comps,
        uiState : state.problems.uiState,
        auth : state.auth
       }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCompetition: (payload) => dispatch({ type : 'COMPETITION_SAGA', payload}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCompSheet);
  