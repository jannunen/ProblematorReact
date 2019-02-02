import { StyleSheet } from 'react-native'
export default  StyleSheet.create({
    modalContainer: {
        backgroundColor: "#30312e",
        flex : 1,
    },
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
    listItem : {

    },
    textInput : {
        height: 40, 
        borderColor: '#decc00', 
        borderWidth: 1,
        color : 'white',
        fontSize : 20,
        padding : 2,
    },
    modalContainer: {
        backgroundColor: '#252623',
        flex: 1,
        margin: 0,
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: 22
    },
    textInputTitle: {
        color : 'white',
        fontSize : 18,
        paddingTop : 4,
    },
    modalTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 28
    },
    modalSubTitle: {
        color: '#decc00',
        marginBottom: 8,
        textTransform: 'uppercase',
        fontSize: 20
    },
});

