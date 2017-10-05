import { Action, Dispatch } from 'redux';
import { Movie } from '../../typings/models.d';
import { MovieState } from '../../typings/state.d';
import { getMovies } from '../../api/server';
import { mapper } from '../../utils/mapper';

// Action Types for Discriminated Unions
export const FETCH_ALL_MOVIES_STARTED = 'FETCH_ALL_MOVIES_STARTED';
export const FETCH_ALL_MOVIES_COMPLETED = 'FETCH_ALL_MOVIES_COMPLETED';
export const FETCH_ALL_MOVIES_FAILED = 'FETCH_ALL_MOVIES_FAILED';
export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE';

// Actions
export interface FetchAllStartedAction extends Action {
    type: 'FETCH_ALL_MOVIES_STARTED';
}

export interface FetchAllCompletedAction extends Action {
    type: 'FETCH_ALL_MOVIES_COMPLETED';
    payload: Movie[];
}

export interface FetchAllFailedAction extends Action {
    type: 'FETCH_ALL_MOVIES_FAILED';
    payload: Error;
}

export interface SetCurrentAction extends Action {
    type: 'SET_CURRENT_MOVIE';
    payload: Movie;
}

// Action Creators
const startedFetchAllCreator = (): FetchAllStartedAction =>
    ({ type: FETCH_ALL_MOVIES_STARTED });
const completedFetchAllCreator = (movies: Movie[]): FetchAllCompletedAction =>
    ({ type: FETCH_ALL_MOVIES_COMPLETED, payload: movies });
const failedFetchAllCreator = (err: Error): FetchAllFailedAction =>
    ({ type: FETCH_ALL_MOVIES_FAILED, payload: err });
const setCurrentCreator = (movie: Movie): SetCurrentAction =>
    ({ type: SET_CURRENT_MOVIE, payload: movie });

// Action Dispatchers - API calls go here inside these
export const fetchMovies = () => (dispatch: Dispatch<MovieState>) => {
    dispatch(startedFetchAllCreator());

    getMovies()
        .then(res => res.json())
        .then(data => data.map((x: any) => mapper(x)))
        .then(movies => dispatch(completedFetchAllCreator(movies)))
        .catch(e => dispatch(failedFetchAllCreator(e)));
};

export const setCurrentMovie = (movie: Movie) => (dispatch: Dispatch<MovieState>) =>
    dispatch(setCurrentCreator(movie));