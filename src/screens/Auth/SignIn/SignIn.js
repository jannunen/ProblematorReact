import React, { PermissionsAndroid} from 'react'
import { Buffer } from 'buffer';
import { authStoreToken} from '../../../store/actions/index';
import { JWT_TOKEN } from '../../../../config';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import { goHome } from '../../navigation'
import { USER_KEY } from '../../../../config'
import { API_ENDPOINT,API_PASS} from '../../../../config';
import backgroundImage from "../../../assets/problematorbg.png";
import problematorLogo from "../../../assets/problemator_logo_new_small.png";
import ProblematorButton from '../../../components/ProblematorButton/ProblematorButton';
import { connect } from 'react-redux';

class SignIn extends React.Component {
  state = {
    username: '', password: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  componentDidMount() {
    console.log("Faking AUTH TOKEN");
      this.props.onAuthStoreToken({ token: JWT_TOKEN, uid: 246});
      goHome();
  }


  handleLoginClick = async () => {
    /*
      this.props.onAuthStoreToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1NDY4MTU3NzYsImp0aSI6Ik16WT0iLCJpc3MiOiJ3d3cucHJvYmxlbWF0b3IuZmkiLCJuYmYiOjE1NDY4MTU3NzYsImV4cCI6MTU0OTQwNzc3NiwiZGF0YSI6eyJ1c2VySWQiOiIyNDYiLCJmaXJzdG5hbWUiOiJKYXJtbyIsImxhc3RuYW1lIjoiQW5udW5lbiIsImVtYWlsIjoiamFubnVuZW5Aa29vZGlvcmphLmNvbSIsImd5bWlkIjoiMSJ9fQ.PB47u4GW7tTS8pKtpdzcgIrkBzoMoL8GBUIBuIm3AhmLHwkb9KKsIQcQof0NoF3bA3662AO_lmwEkPUAZpQ_fQ");
      goHome();
      */
            /*

    try {
      // login with provider
      console.log("Sending info to "+API_ENDPOINT);
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'apikey' : API_PASS
        }),
        body: JSON.stringify(userInfo),
      }).then((response) => response.json())
        .then((responseJson) => {
          // Now we can save it locally
          let user = null;
          AsyncStorage.setItem(USER_KEY, key);
          console.log('user successfully signed in!', key)
          alert(responseJson.msg);
          if (!responseJson.error) {
            goHome();
          }
          //return responseJson.movies;
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });

    } catch (err) {
      console.log('error:', err)
    }
    */
  };


  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Image source={problematorLogo} />
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <ProblematorButton
          title='Login'
          onPress={this.handleLoginClick}
        />
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  input: {
    width: "90%",
    height: 55,
    backgroundColor: '#42A5F5',
    backgroundColor: 'rgba(0,0,0,0.4)',
    margin: 20,
    padding: 8,
    color: 'white',
    borderBottomColor : "#decc00",
    borderBottomWidth : 1,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStoreToken : (payload) => dispatch(authStoreToken(payload))
  }
}
export default connect(null, mapDispatchToProps)(SignIn);