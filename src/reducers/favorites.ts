import {
    FETCH_ALL_FAVORITES_STARTED, FETCH_ALL_FAVORITES_COMPLETED,
    FETCH_ALL_FAVORITES_FAILED,

    FetchAllStartedAction, FetchAllCompletedAction,
    FetchAllFailedAction
} from '../actions/favorites';
import { FavoriteState } from '../typings/state.d';

const initialState: FavoriteState = {
    fetching: false,
    fetched: false,
    all: []
};

type MovieAction = 
    FetchAllStartedAction | FetchAllCompletedAction |
    FetchAllFailedAction;

export const favoriteReducer = (state: FavoriteState = initialState, action: MovieAction): FavoriteState => {
    switch (action.type) {
        case FETCH_ALL_FAVORITES_STARTED:
            state = {...state, fetching: true};
            break;
        case FETCH_ALL_FAVORITES_COMPLETED:
            state = {...state, fetching: false, fetched: true, all: action.payload};
            break;
        case FETCH_ALL_FAVORITES_FAILED:
            state = {...state, fetched: false, fetching: false, error: action.payload};
            break;
        default:
            break;
    }
    return state;
};