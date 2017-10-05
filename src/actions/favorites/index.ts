import { Action, Dispatch } from 'redux';
import { Favorite, Book, Movie, Music } from '../../typings/models.d';
import { FavoriteState } from '../../typings/state.d';
import { getFavorites, addFavorite, removeFavorite } from '../../api/server';
import { mapper } from '../../utils/mapper';

// Action Types for Discriminated Unions
export const FETCH_ALL_FAVORITES_STARTED = 'FETCH_ALL_FAVORITES_STARTED';
export const FETCH_ALL_FAVORITES_COMPLETED = 'FETCH_ALL_FAVORITES_COMPLETED';
export const FETCH_ALL_FAVORITES_FAILED = 'FETCH_ALL_FAVORITES_FAILED';

type FavoriteItemType = Book | Movie | Music;

// Actions
export interface FetchAllStartedAction extends Action {
    type: 'FETCH_ALL_FAVORITES_STARTED';
}

export interface FetchAllCompletedAction extends Action {
    type: 'FETCH_ALL_FAVORITES_COMPLETED';
    payload: Favorite[];
}

export interface FetchAllFailedAction extends Action {
    type: 'FETCH_ALL_FAVORITES_FAILED';
    payload: Error;
}

// Action Creators
const startedFetchAllCreator = (): FetchAllStartedAction =>
    ({ type: FETCH_ALL_FAVORITES_STARTED });
const completedFetchAllCreator = (favorites: Favorite[]): FetchAllCompletedAction =>
    ({ type: FETCH_ALL_FAVORITES_COMPLETED, payload: favorites });
const failedFetchAllCreator = (err: Error): FetchAllFailedAction =>
    ({ type: FETCH_ALL_FAVORITES_FAILED, payload: err });

// Action Dispatchers - API calls go here inside these
export const fetchFavorites = () => (dispatch: Dispatch<FavoriteState>) => {
    dispatch(startedFetchAllCreator());

    getFavorites()
        .then(res => res.json())
        .then(data => data.map((x: any) => mapper(x)))
        .then(mapped => mapped
            .filter((i: FavoriteItemType | null) => !!i)
            .map((i: FavoriteItemType): Favorite => ({ item: i })))
        .then(items => dispatch(completedFetchAllCreator(items)))
        .catch(e => dispatch(failedFetchAllCreator(e)));
};

export const addToFavorite = (item: FavoriteItemType) => (dispatch: Dispatch<FavoriteState>) => {
    // TODO: Call server api
    addFavorite(item.id)
        .then(_ => dispatch(fetchFavorites()));
};

export const removeFromFavorite = (item: FavoriteItemType) => (dispatch: Dispatch<FavoriteState>) => {
    // TODO: Call server api
    removeFavorite(item.id)
    .then(_ => dispatch(fetchFavorites()));
};