import { Action, Dispatch } from 'redux';
import { Music } from '../../typings/models.d';
import { MusicState } from '../../typings/state.d';
import { getMusic } from '../../api/server';
import { mapper } from '../../utils/mapper';

// Action Types for Discriminated Unions
export const FETCH_ALL_MUSIC_STARTED = 'FETCH_ALL_MUSIC_STARTED';
export const FETCH_ALL_MUSIC_COMPLETED = 'FETCH_ALL_MUSIC_COMPLETED';
export const FETCH_ALL_MUSIC_FAILED = 'FETCH_ALL_MUSIC_FAILED';
export const SET_CURRENT_MUSIC = 'SET_CURRENT_MUSIC';

// Actions
export interface FetchAllStartedAction extends Action {
    type: 'FETCH_ALL_MUSIC_STARTED';
}

export interface FetchAllCompletedAction extends Action {
    type: 'FETCH_ALL_MUSIC_COMPLETED';
    payload: Music[];
}

export interface FetchAllFailedAction extends Action {
    type: 'FETCH_ALL_MUSIC_FAILED';
    payload: Error;
}

export interface SetCurrentAction extends Action {
    type: 'SET_CURRENT_MUSIC';
    payload: Music;
}

// Action Creators
const startedFetchAllCreator = (): FetchAllStartedAction =>
    ({ type: FETCH_ALL_MUSIC_STARTED });
const completedFetchAllCreator = (music: Music[]): FetchAllCompletedAction =>
    ({ type: FETCH_ALL_MUSIC_COMPLETED, payload: music });
const failedFetchAllCreator = (err: Error): FetchAllFailedAction =>
    ({ type: FETCH_ALL_MUSIC_FAILED, payload: err });
const setCurrentCreator = (music: Music): SetCurrentAction =>
    ({ type: SET_CURRENT_MUSIC, payload: music });

// Action Dispatchers - API calls go here inside these
export const fetchMusic = () => (dispatch: Dispatch<MusicState>) => {
    dispatch(startedFetchAllCreator());

    getMusic()
        .then(res => res.json())
        .then(data => data.map((x: any) => mapper(x)))
        .then(music => dispatch(completedFetchAllCreator(music)))
        .catch(e => dispatch(failedFetchAllCreator(e)));
};

export const setCurrentMusic = (music: Music) => (dispatch: Dispatch<MusicState>) =>
    dispatch(setCurrentCreator(music));