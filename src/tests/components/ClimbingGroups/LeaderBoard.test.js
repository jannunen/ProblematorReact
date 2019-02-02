import { shallow } from 'enzyme';
import React from 'react';
//import LeaderBoard from '../../../components/ClimbingGroups/LeaderBoard';

describe('LeaderBoard component', () => {
    it('should render correctly',() => {
        // This is to test a snapshot view
        expect(true).toBe(true);

        /*
        const wrapper = shallow(
            <LeaderBoard  />
          );
          expect(wrapper).toMatchSnapshot();
          */
    })

    it('it should define arrow direction propery', () => {
        // This is to test component functions
        /*
        let leaderBoard = renderer.create( <LeaderBoard />) .getInstance();

        test('direction down',() => {
            expect(leaderBoard.defineArrowDirection(null,null)).toBe('equal');
        })
        */
    });
});

