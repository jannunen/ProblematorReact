import 'react-native';
import React from 'react';
    jest.mock('TouchableOpacity', () => 'TouchableOpacity')
//import { TouchableOpacity } from 'react-native';
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { shallow , mount} from 'enzyme';
import  Icon  from 'react-native-vector-icons/Ionicons';
import renderer from 'react-test-renderer';
import { Navigation} from 'react-native-navigation';
import thunk from 'redux-thunk'
import ProblematorIconButton from '../../../components/ProblematorIconButton/ProblematorIconButton';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


let  history, wrapper;

describe('ProblematorIconButton component tests',() => {

it('should correctly render ProblematorIconButton component', () => {
  const store = mockStore({ loading: false, error :false })
  const tree = shallow(<ProblematorIconButton name="ios-build" />);
  expect(tree).toMatchSnapshot();
});

it('should handle onPress',() => {

    const onPressEvent = jest.fn();
    onPressEvent.mockReturnValue('Link on press invoked');
    const wrapper = shallow(<ProblematorIconButton onPress={ onPressEvent } text='CustomLink Component'/>);
    wrapper.find('TouchableOpacity').props().onPress();
    expect( onPressEvent ).toHaveBeenCalled();

});


})