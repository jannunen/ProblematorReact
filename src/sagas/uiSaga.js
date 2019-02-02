import { call ,put} from 'redux-saga/effects'
import { Alert } from 'react-native'

export function* showErrorAlert (action) {
  const error = action.payload;
  yield call(Alert.alert, 'Error', error.message != null ? error.message : error)
}

export function* showAlert (action) {
  console.log("In Showalert",action.payload)
  const message = action.payload;
  const msg = message.message != null ? message.message : message;
  if (typeof(msg)=="string") {
    console.log("Wanting to alert",msg.toString())
    Alert.alert( 'Problemator', msg.toString());
  } else {
    console.log("cannot show",msg);
  }

}

