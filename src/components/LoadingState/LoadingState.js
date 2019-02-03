import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import * as Animatable from 'react-native-animatable';

export default  ({text, children}) => {
    AnimatableFontAwesome = Animatable.createAnimatableComponent(FontAwesome);
    return (
        <View>
            <Text style={styles.emptyStateText}>{children}</Text>
            <View style={{ justifyContent: 'center', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
                <FontAwesome name="robot" color="#decc00" size={55} />
                <AnimatableFontAwesome style={{ left : -130, }} size={25} color="white" name="cogs" animation="rotate" iterationCount="infinite" duration={1500} direction="alternate" easing="ease-in" />
                <AnimatableFontAwesome style={{ left : 0 }} size={25} color="white" name="cogs" animation="rotate" iterationCount="infinite" duration={2000} easing="linear" direction="reverse"/>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    emptyStateText: {
        color : 'white',
        borderColor : 'white',
        textAlign : 'center',
        fontWeight : 'bold',
        paddingTop : 16,
        textTransform : 'uppercase',
        fontSize : 20,
        padding : 8,
    },
})
