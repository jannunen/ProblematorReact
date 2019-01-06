import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';


ProblematorButton = (props) => {
    if (!props.color )  {
        props.color = "white";
    }
    return (
        <View style={styles.buttonContainer}>
        <TouchableOpacity>
            <Text
                style={[
                    styles.button,
                    { backgroundColor: props.color != null ? props.color : "#decc00" },
                    props.disabled ? styles.disabled : null
                ]}
                {...props}
            >{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
        }

const styles = StyleSheet.create({
    buttonContainer: {
        width : "90%",
        height : 55,    
        padding : 6,
        margin: 2,
        backgroundColor : "#decc00",
        alignItems : 'center'
    },
    button: {
        color : "white",
        padding : 6,
        fontSize : 20 
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
      },

});

export default ProblematorButton;