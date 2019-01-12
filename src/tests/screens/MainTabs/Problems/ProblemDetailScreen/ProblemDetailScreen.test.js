import 'react-native';
import React from 'react';
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Navigation} from 'react-native-navigation';
import thunk from 'redux-thunk'
import problem from '../../../../fixtures/problem';
import ProblemDetailScreen from '../../../../../screens/MainTabs/Problems/ProblemDetailScreen/ProblemDetailScreen';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


let  history, wrapper;

describe('ProblemDetailScreen tests',() => {

it('should correctly render ProblemDetailScreen', () => {
  const store = mockStore({ loading: false, error :false })
  const tree = shallow(<ProblemDetailScreen problem={problem} />);
  expect(tree).toMatchSnapshot();
});




})