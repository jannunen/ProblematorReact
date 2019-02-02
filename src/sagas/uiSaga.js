import { call ,put} from 'redux-saga/effects'
import { Alert } from 'react-native'

export function* showErrorAlert (action) {
  const error = action.payload;
  let str = error.message != null ? error.message : error;
  str = str.replace("<br />", "\n")
  yield call(Alert.alert, 'Error', str)
}

export function* showAlert (action) {
  console.log("In Showalert",action.payload)
  const message = action.payload;
  const msg = message.message != null ? message.message : message;
  if (typeof(msg)=="string") {
    let str = msg.toString();
    str = str.replace("<br />","\n")
    console.log("Wanting to alert",str)
    Alert.alert( 'Problemator', str);
  } else {
    console.log("cannot show",msg);
  }

}

