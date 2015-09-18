/**
 * Created by ratoico on 9/18/15.
 */
import {Map} from 'immutable'

export default function (state = Map(), action = '') {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
    }
    return state;
};

function setState(oldState, newState) {
    return oldState.merge(newState);
}
