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
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";


export default class ProblemDetailScreen extends Component {

    constructor(props) {
        super(props);
        //Dimensions.addEventListener("change", this.updateStyles);
      }

    render() {
        return (
            <View>
            {this.props.problem.problemid}
            </View>
        );
    }
}