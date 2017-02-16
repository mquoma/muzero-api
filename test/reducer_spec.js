import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
	
	it('handles SET_ENTRIES', () => {
		const initState = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Trains']};
		const nextState = reducer(initState, action);

		expect(nextState).to.equal(fromJS({
			entries:['Trains']
			}));

	});

	it('handles NEXT', () => {
		const initState = fromJS({
			entries: ['Trains', '28']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(initState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trains', '28']
			},
			entries: []
		}));
	});

	it('handles VOTE', () => {
		const initState = fromJS({
			vote: {
				pair: ['Trains', '28']
			},
			entries: []
		});
		const action = {type: 'VOTE', entry: 'Trains'};
		const nextState = reducer(initState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trains', '28'],
				tally: {Trains: 1}
			},
			entries: []
		}));
	});

	it('has init state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Trains']};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Trains']
		}));
	});

	it('can be used with reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Trains', '28']},
			{type: 'NEXT'},
			{type: 'VOTE', entry: 'Trains'},
			{type: 'VOTE', entry: '28'},
			{type: 'VOTE', entry: 'Trains'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Trains'
		}));
	});
});
