import React from 'react/addons';
import {expect} from 'chai';
import Voting from '../../src/components/Voting';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(<Voting pair={['LotR', 'GoT']}/>);
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].getDOMNode().textContent).to.equal('LotR');
        expect(buttons[1].getDOMNode().textContent).to.equal('GoT');
    });

    it('invokes a callback when a button is clicked', () => {
        let votedWith;
        let vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(<Voting pair={['LotR', 'GoT']} vote={vote}/>);
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0].getDOMNode());

        expect(votedWith).to.equal('LotR');

    });

    it('disable buttons when user has voted', () => {
        const component = renderIntoDocument(<Voting pair={['LotR', 'GoT']} hasVoted='GoT'/>);
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].getDOMNode().hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].getDOMNode().hasAttribute('disabled')).to.equal(true);
    });

    it('adds voted label on the button whose entry matches the value of hasVoted', () => {
        const component = renderIntoDocument(<Voting pair={['LotR', 'GoT']} hasVoted='GoT'/>);
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[1].getDOMNode().textContent).to.contain('Voted');
    });

    it('renders just the winner component when there is an actual winner', () => {
        const component = renderIntoDocument(<Voting pair={['LotR', 'GoT']} winner='GoT'/>);
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(0);

        const winner = React.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('GoT');
    });

});