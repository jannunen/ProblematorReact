import 'react-native';
import React from 'react';
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Navigation} from 'react-native-navigation';
import thunk from 'redux-thunk'
import problem from '../../../../fixtures/problem';
import ProblemDetails from '../../../../../Components/ProblemDetails/ProblemDetails';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


let  history, wrapper;

describe('ProblemDetails component tests',() => {

it('should correctly render ProblemDetails component', () => {
  const store = mockStore({ loading: false, error :false })
  const tree = shallow(<ProblemDetails problem={problem} />);
  expect(tree).toMatchSnapshot();
});


})