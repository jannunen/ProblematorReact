import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions
  } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import  MyCompSheet  from '../../../../components/Competitions/MyCompSheet';


export default class PointEntryScreen extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <MyCompSheet {...this.props} />
        );
    }
}