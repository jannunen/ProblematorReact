import React, { PermissionsAndroid} from 'react'
import DeviceInfo from 'react-native-device-info';
import { Buffer } from 'buffer';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'

import { goHome } from '../../navigation'
import { USER_KEY } from '../../../../config'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { API_ENDPOINT,API_PASS} from '../../../../config';

export default class SignIn extends React.Component {
  state = {
    username: '', password: '', hasCameraPermission : null, code : null
  }

  componentDidMount() {
    const granted = this.permissionCheck();
    this.setState({
      hasCameraPermission: granted
    });
  }

  permissionCheck = async () => {
    let isGranted = false;
    try {
     isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    } catch (e) {
      console.log("err when check",e);
    }
    if (isGranted) {
      return true;
    }
    try {
      console.log('before request');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera use permission',
          message: 'The app needs camera to scan the QR code which links you to your account.',
        }
      );
      console.log('after request');
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log('error');
      console.log(err);
    }
  }

  handleContinueClick = async () => {
    if (this.state.code == null) {
      alert("Read the QR code first!");
      return;
    }
    // Gather some device info to make sure the device does not change.
    // OR if it changes, the old device is invalidated until it's
    // revalidated on the counter
    let key = this.state.code;
    let encKey = new Buffer(key).toString("base64");
    let userInfo = {
      userkey : encKey,
    };
    try {
      userInfo['devicename'] = DeviceInfo.getDeviceName();
      userInfo['mac'] =  DeviceInfo.getMACAddress();
      userInfo['manufacturer'] =  DeviceInfo.getManufacturer();
      userInfo['uniqid']=  DeviceInfo.getUniqueID();
    } catch (e) {
      // Could not set all the info
      console.log('Error',e);
    }

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
  };

  onSuccess(e) {
    alert(e.data);
    this.setState({
        code : e.data
    })
  }


  render() {
    const qrScanner = <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Go to the counter of your gym to <Text style={styles.textBold}>link your device</Text> to your account.
            </Text>
          }
       />;
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
        {this.state.hasCameraPermission ? qrScanner : <Text>No permission to use camera (yet).</Text>}
        </View>
        <Button
          title='Continue'
          onPress={this.handleContinueClick}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    alignItems : 'center'
  },
  camera: {
    margin : 10,
    padding : 10
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection : 'column',
    alignItems: 'center',
    padding : 10
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});