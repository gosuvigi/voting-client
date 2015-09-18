/**
 * Created by vigi on 9/18/15:10:51 AM.
 */
import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('LotR', 'GoT'),
                    tally: Map({'GoT': 7})
                })
            })
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 7}
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['LotR', 'GoT'],
                    tally: {'GoT': 7}
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 7}
            }
        }));
    });

    it('handles SET_STATE without an initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['LotR', 'GoT'],
                    tally: {'GoT': 7}
                }
            }
        };

        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 7}
            }
        }));
    });
});

