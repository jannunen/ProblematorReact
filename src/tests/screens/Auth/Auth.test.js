import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'test'
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'mobx-react';
import { Text } from 'native-base';
import SignIn from '../../../screens/Auth/SignIn/SignIn';

// https://github.com/react-navigation/react-navigation/issues/2269
// React Navigation generates random React keys, which makes
// snapshot testing fail. Mock the randomness to keep from failing.
jest.mock('react-navigation/src/routers/KeyGenerator', () => ({
    generateKey: jest.fn(() => 123),
  }));
  
  describe('screens-test', () => {
    describe('auth-tests', () => {
      it('can render the SignIn page correctly', () => {
        const wrapper = shallow(<SignIn />);
  
        // You can even do snapshot testing,
        // if you pull in enzyme-to-json and configure
        // it in snapshotSerializers in package.json
        expect(wrapper).toMatchSnapshot();
      });
    });
  });



/* import React from 'react';
import { shallow } from 'enzyme';

let addExpense, history, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<SignIn history={history} />);
});

test('should render SignIn page correctly', () => {
  expect(wrapper).toMatchSnapshot();
}); */