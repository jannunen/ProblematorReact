import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export default  ({text, children}) => {
    return (
        <View>
            <Text style={styles.emptyStateText}>{children}</Text>
            <View style={{ justifyContent: 'center', flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
                <FontAwesome name="robot" color="#decc00" size={55} />
                <FontAwesome style={{ paddingTop: 0 }} name="question" color="#d0d0d0" size={25} />
                <FontAwesome style={{ paddingTop: 10 }} name="question" color="#d0d0d0" size={20} />
                <FontAwesome style={{ paddingTop: 6 }} name="question" color="#d0d0d0" size={15} />
                <FontAwesome style={{ paddingTop: 15 }} name="question" color="#d0d0d0" size={10} />
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
