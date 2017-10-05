import {
    FETCH_ALL_MOVIES_STARTED, FETCH_ALL_MOVIES_COMPLETED,
    FETCH_ALL_MOVIES_FAILED, SET_CURRENT_MOVIE,

    FetchAllStartedAction, FetchAllCompletedAction,
    FetchAllFailedAction, SetCurrentAction
} from '../actions/movies';
import { MovieState } from '../typings/state.d';

const initialState: MovieState = {
    fetching: false,
    fetched: false,
    all: []
};

type MovieAction = 
    FetchAllStartedAction | FetchAllCompletedAction |
    FetchAllFailedAction | SetCurrentAction;

export const movieReducer = (state: MovieState = initialState, action: MovieAction): MovieState => {
    switch (action.type) {
        case FETCH_ALL_MOVIES_STARTED:
            state = {...state, fetching: true};
            break;
        case FETCH_ALL_MOVIES_COMPLETED:
            state = {...state, fetching: false, fetched: true, all: action.payload};
            break;
        case FETCH_ALL_MOVIES_FAILED:
            state = {...state, fetched: false, fetching: false, error: action.payload};
            break;
        case SET_CURRENT_MOVIE:
            state = {...state, current: action.payload};
            break;
        default:
            break;
    }
    return state;
};