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
import  ProblemDetails  from '../../../../components/ProblemDetails/ProblemDetails';


export default class ProblemDetailScreen extends Component {

    constructor(props) {
        super(props);
        //Dimensions.addEventListener("change", this.updateStyles);
      }

    render() {
        return (
            <ProblemDetails {...this.props} />
        );
    }
}