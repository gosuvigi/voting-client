/**
 * Created by vigi on 9/18/15:3:31 PM.
 */
/**
 * Create a "remote action middleware" that causes an action to be dispatched not only to the original store,
 * but also to a remote store using a Socket.io connection.
 *
 * @param socket
 * @param store
 * @param next
 * @param action
 */
export default socket => store => next => action => {
    console.log('in middleware: ', action);
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    return next(action);
}
