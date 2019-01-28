import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';


export class ProblematorButton extends React.Component  {
    constructor(props) {
        super(props);
        if (!props.color )  {
            props.color = "white";
        }
    }

    render() {
        return (
            <View style={[styles.buttonContainer,this.props.containerStyle]}>
            <TouchableOpacity>
                <Text
                    style={[
                        styles.button,
                        { backgroundColor: this.props.color != null ? this.props.color : "#decc00" },
                        this.props.disabled ? styles.disabled : null
                    ]}
                    {...this.props}
                >{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width : "90%",
        height :45,    
        padding : 6,
        margin: 2,
        backgroundColor : "#decc00",
        flexDirection : 'column',
        alignItems : 'center'
    },
    button: {
        color : "white",
        padding : 4,
        fontSize : 17 ,
        textTransform: 'uppercase',


    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
      },

});

export default ProblematorButton;