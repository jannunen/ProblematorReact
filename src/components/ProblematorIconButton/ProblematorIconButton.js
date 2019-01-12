import * as React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  SectionList,
  TouchableOpacity
} from 'react-native'

import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

export class ProblematorIconButton extends React.Component {

    constructor(props){
        super(props)
      }


    onPressHandler = () => {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPressHandler}>
                <FontAwesome style={[styles.iconStyle, this.props.style ]} {...this.props} />
            </TouchableOpacity>
        )
    }

}


const styles = StyleSheet.create({
    iconStyle : {
        fontSize : 30,
        color : 'white',
        padding : 8,

    }
});


const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblematorIconButton);