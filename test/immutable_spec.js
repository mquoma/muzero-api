import {expect} from 'chai';
import {List, Map} from 'immutable';

describe( 'immutability', () => {
	describe('a number', () => {
		function increment(curState) {
			return curState + 1;
		}

		it('is immutable', () => {
			let state = 13;
			let nextState = increment(state);

			expect(nextState).to.equal(14);
			expect(state).to.equal(13);
		});
	});

	describe('a List', () => {
		function addMovie(curState, movie) {
			return curState.push(movie);
		}

		it('is immutable', () => {
			let state = List.of('Trains', '28');
			let nextState = addMovie(state, 'Sun');

			expect(nextState).to.equal(List.of(
				'Trains', '28', 'Sun'
			));

			expect(state).to.equal(List.of(
				'Trains', '28'
			));
		});
	});

	describe('a tree', () => {
		// function addMovieToMap(curState, movie) {
		// 	return curState.set('movies', 
		// 		curState.get('movies').push(movie)
		// 	)
		// }

		function addMovieToMap(curState, movie) {
			return curState.update('movies', movies => movies.push(movie));
		}

		it('is immutable', () => {
			let state = Map({
				movies: List.of('Trains', '28')
			});
			let nextState = addMovieToMap(state, 'Sun');

			expect(nextState).to.equal(Map({
				movies: List.of(
					'Trains', '28', 'Sun'
					)
			}));

			expect(state).to.equal(Map({
				movies: List.of('Trains', '28')
			}));
		});
	});
});