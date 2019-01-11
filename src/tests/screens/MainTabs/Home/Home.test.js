import 'react-native';
import React from 'react';
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Navigation} from 'react-native-navigation';
import thunk from 'redux-thunk'
import  Home  from '../../../../screens/MainTabs/Home/Home';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


let  history, wrapper;

test('should correctly render LoginPage', () => {
  const store = mockStore({ loading: false, error :false })
  const tree = shallow(<Home />);
  expect(tree).toMatchSnapshot();
});

it('should correctly load problem details page',() => {

            // Navigation.push(this.props.componentId, {
            //   component: {
            //     name: 'com.problemator.ProblemDetailScreen',
            //   }
            // });

});
/*
test('should call onProblemLoad in componentDidMount', () => {
  wrapper = shallow(<Home  {...props}/>)
  wrapper.instance().componentDidMount()
  expect(onLoadProblems.calledOnce).toBe(true)
});
*/

