import React from 'react/addons';
import {RouteHandler} from 'react-router';
import {List, Map} from 'immutable';

const pair = List.of('LotR', 'GoT');
const tally = Map({'LotR': 4, GoT: 12});

export default React.createClass({
    render: function() {
        return <RouteHandler pair={pair} tally={tally}/>
    }
});