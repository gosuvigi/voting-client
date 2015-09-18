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

    it('handles VOTE by setting hasVoted property', () => {
        const state = fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 77}
            }
        });
        const action = {type: 'VOTE', entry: 'LotR'};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 77}
            },
            hasVoted: 'LotR'
        }));
    });

    it('does not set hasVoted property for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 77}
            }
        });
        const action = {type: 'VOTE', entry: 'Matrix'};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 77}
            }
        }));
    });

    it('removes hasVoted on SET_STATE when the vote moves on to the next pair', () => {
        const initialState = fromJS({
            vote: {
                pair: ['LotR', 'GoT'],
                tally: {'GoT': 77}
            },
            hasVoted: 'GoT'
        });
        const action = {
            type: 'SET_STATE', state: {
                vote: {
                    pair: ['Matrix', 'The 13th Floor']
                }
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Matrix', 'The 13th Floor'],
            }
        }));
    });
});

