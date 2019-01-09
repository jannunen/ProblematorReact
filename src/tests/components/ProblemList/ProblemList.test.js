import React from 'react';
import { shallow } from 'enzyme';
import { ProblemList } from '../../../components/ProblemList/ProblemList';
import problems from '../../fixtures/problems';

let  onLoadProblems, history, wrapper;

beforeEach(() => {
  onLoadProblems = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<ProblemList onLoadProblems={onLoadProblems} problems={problems} history={history} />).dive();
});

test('should render ProblemList correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

/*
test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
*/

