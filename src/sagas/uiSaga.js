import { call } from 'redux-saga/effects'
import { Alert } from 'react-native'

export function* showErrorAlert (action) {
  const error = action.payload;
  yield call(Alert.alert, 'Error', error.message != null ? error.message : error)
}
