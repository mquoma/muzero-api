import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('adds entries to state', () => {
			
			const state = Map();
			const entries = List.of('Trains', '28');

			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trains', '28')
			}));

		});

		it('converts to immutable', () => {

			const state = Map();
			const entries = ['Trains', '28'];
			
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trains', '28')
			}));
		});
	});

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trains', '28', 'Sun')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trains', '28')
				}),
				entries: List.of('Sun')
			}));
		});

		it('puts winner back into queue', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trains', '28'),
					tally: Map({
						'Trains': 4,
						'28': 2
					})
				}),
				entries: List.of('Sun', 'Millions', '127')
			})
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sun', 'Millions')
				}),
				entries: List.of('127', 'Trains')
			}));
		});

		it('puts ties back in', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trains', '28'),
					tally: Map({
						'Trains': 3,
						'28': 3
					})
				}),
				entries: List.of('Sun', 'Millions', '127')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Sun', 'Millions')
				}),
				entries: List.of('127', 'Trains', '28')
			}));
		});

		it('marks winner', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trains', '28'),
					tally: Map({
						'Trains': 4,
						'28': 2
					})
				}),
				entries: List.of()
			});
			console.log('state');
			console.log(state);
			const nextState = next(state);

			console.log('nextState');
			console.log(nextState);
			expect(nextState).to.equal(Map({
				winner: 'Trains'
			}));
		});
	});

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			const state = Map({
			// 	vote: Map({
			// 		pair: List.of('Trains', '28')
			// 	}),
			// entries: List()
				pair: List.of('Trains', '28')
			});

			const nextState	= vote(state, 'Trains');

			expect(nextState).to.equal(Map({
				pair: List.of('Trains', '28'),
				tally: Map({
					'Trains': 1
				})
				// vote: Map({
				// 	pair: List.of('Trains', '28'),
				// 	tally: Map({
				// 		'Trains': 1
				// 	})
				// }),
				// entries: List()
			}));

		});

		it('adds to existing tally', () => {
			const state = Map({

					pair: List.of('Trains', '28'),
					tally: Map({
						'Trains': 3,
						'28': 2
					})

				// vote: Map({
				// 	pair: List.of('Trains', '28'),
				// 	tally: Map({
				// 		'Trains': 3,
				// 		'28': 2
				// 	})
				// }),
				// entries: List()
			});

			const nextState = vote(state, 'Trains');

			expect(nextState).to.equal(Map({

					pair: List.of('Trains', '28'),
					tally: Map({
						'Trains': 4,
						'28': 2
					})

				// vote: Map({
				// 	pair: List.of('Trains', '28'),
				// 	tally: Map({
				// 		'Trains': 4,
				// 		'28': 2
				// 	})
				// }),
				//entries: List()

			}));
		});
	});

});