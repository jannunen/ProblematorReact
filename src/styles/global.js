import { StyleSheet } from 'react-native'
export default  StyleSheet.create({
    defaultContainer: {
        backgroundColor: "#30312e",
        flex : 1,
    },
    h1Style: {
        fontWeight : 'bold',
        fontSize : 30,
        color : 'white',
        textAlign : 'center',
        textTransform: 'uppercase',

    },
    h2Style: {
        fontWeight : 'bold',
        fontSize : 24,
        color : 'white',
        textAlign : 'center',
        textTransform: 'uppercase',

    },
    listItemContainer: {
        paddingTop: 2,
        paddingLeft: 8,
        paddingBottom: 4,
        paddingRight : 6,
        flex: 1,
        flexDirection: 'row',
        height: 40,
        width: "100%",
        borderColor: '#636169',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
});

