import React from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import Voting from './components/Voting';
import App from './components/App';
import Results from './components/Results';

const routes = <Route handler={App}>
    <Route path='/results' handler={Results}/>
    <DefaultRoute handler={Voting}/>
</Route>;

Router.run(routes, (Handler) => {
    React.render(
        <Handler/>,
        document.getElementById('app')
    );
});
