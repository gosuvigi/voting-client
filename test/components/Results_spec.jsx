import React from 'react/addons';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('Results', () => {

    it('renders entries with vote count or zero', () => {
        const pair = List.of('LotR', 'GoT');
        const tally = Map({'GoT': 7});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [lotr, got] = entries.map(e => e.getDOMNode().textContent);

        expect(entries.length).to.equal(2);
        expect(lotr).to.contain('LotR');
        expect(lotr).to.contain('0');
        expect(got).to.contain('GoT');
        expect(got).to.contain('7');
    });

    it('invokes the next callback when next button is clicked', () => {
        let nextInvoked = false;
        let next = () => nextInvoked = true;

        const pair = List.of('LotR', 'GoT');
        const component = renderIntoDocument(
            <Results pair={pair} tally={Map()} next={next}/>
        );

        Simulate.click(React.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(<Results winner='GoT' pair={['LotR', 'GoT']} tally={Map()}/>);
        const winner = React.findDOMNode(component.refs.winner);

        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('GoT');
    });
});