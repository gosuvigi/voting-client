/**
 * Created by vigi on 9/18/15:3:24 PM.
 */
export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    }
}

export function vote(entry) {
    return {
        type: 'VOTE',
        entry,
        meta: {remote: true}
    }
}

export function next() {
    return {
        type: 'NEXT',
        meta: {remote: true}
    }
}