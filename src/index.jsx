import React from 'react';
import Voting from './components/Voting';

const pair = ['LotR', 'GoT'];

React.render(
    <Voting pair={pair}/>,
    document.getElementById('app')
);