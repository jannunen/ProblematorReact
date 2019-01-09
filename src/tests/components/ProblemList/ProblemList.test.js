import React from 'react';
import { shallow } from 'enzyme';
import  ProblemList  from '../../../components/ProblemList/ProblemList';
import problems from '../../fixtures/problems';
import mockStore from 'redux-mock-store';
import { getProblems } from '../../../store/actions/problems';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // you can mock any middlewares here if necessary
const store = mockStore(middlewares);

let  onLoadProblems, history, wrapper;

const initialState = {
    problems : problems,
    loading : false,
    error : null
}

beforeEach(() => {
    mockStore.clearActions();
  });

describe('Testing ProblemList CameraSettings', () => {
    it('renders as expected', () => {
    wrapper = shallow(
        <ProblemList />,
        { context: { store: mockStore(initialState) } },
      );
      expect(wrapper).toMatchSnapshot();
    })

    it('Fetches problems',async () => {
        await mockStore.dispatch(getProblems());
        expect(mockStore.getActions()).toMatchSnapshot();
    })
});


/*
test('should all onLoadProblems', () => {
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
*/
