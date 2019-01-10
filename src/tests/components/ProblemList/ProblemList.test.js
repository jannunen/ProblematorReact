import React from 'react';
import { shallow } from 'enzyme';
import  ProblemList  from '../../../components/ProblemList/ProblemList';
import problems from '../../fixtures/problems';
import configureStore from 'redux-mock-store';
import { getProblems } from '../../../store/actions/problems';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

let  store,onLoadProblems, history, wrapper;

const initialState = {
    problems : problems,
    loading : false,
    error : null
}

beforeEach(() => {
  });

describe('Testing ProblemList component', () => {

    it('renders as expected', () => {
    wrapper = shallow(
        <ProblemList />,
        { context: { store: mockStore(initialState) } },
      );
      expect(wrapper).toMatchSnapshot();
    })

    it('Fetches problems',async () => {
        fetch.mockResponseOnce(JSON.stringify(problems));
        // Be sure to set the auth to initialstate
        const store = mockStore({auth : { token : 'test_token'}});
        await store.dispatch(getProblems());
        expect(store.getActions()).toMatchSnapshot();
    })

    if('calls the handleProblemClicked event',() => {
        wrapper = shallow(
            <ProblemList handleItemClicked={handleItemClickedSpy} />,
            { context: { store: mockStore(initialState) } },
        );
        const handleItemClickedSpy = sinon.spy(wrapper, 'handleItemClicked');
        expect(handleItemClickedSpy.calledOnce).toBe(true);
    });
});


/*
test('should all onLoadProblems', () => {
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
*/
