import React from 'react'
import Router, {Route, DefaultRoute} from 'react-router'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import App from './components/App'
import {VotingContainer} from './components/Voting'
import {ResultsContainer} from './components/Results'

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['GoT', 'LotR'],
            tally: {'GoT': 7}
        }
    }
});

const routes = <Route handler={App}>
    <Route path='/results' handler={ResultsContainer}/>
    <DefaultRoute handler={VotingContainer}/>
</Route>;

Router.run(routes, (Handler) => {
    React.render(
        <Provider store={store}>
            {() => <Handler/>}
        </Provider>,
        document.getElementById('app')
    );
});
