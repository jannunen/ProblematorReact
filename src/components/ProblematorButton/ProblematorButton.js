import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    ActivityIndicator,
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
        let text = (
            <Text
            style={[
                styles.button,
                { backgroundColor: this.props.color != null ? this.props.color : "#decc00" },
                this.props.disabled ? styles.disabled : null
            ]}
            {...this.props}
            >{this.props.title}
            </Text>);

        if (this.props.showLoading===true) {
            text = <ActivityIndicator style={{ paddingTop : 6}} size="small" color="white" />
        }
        return (
            <View style={[styles.buttonContainer,this.props.containerStyle]}>
                <TouchableOpacity>
                    {text}
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