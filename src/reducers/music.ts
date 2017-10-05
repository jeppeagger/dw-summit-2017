import {
    FETCH_ALL_MUSIC_STARTED, FETCH_ALL_MUSIC_COMPLETED,
    FETCH_ALL_MUSIC_FAILED, SET_CURRENT_MUSIC,

    FetchAllStartedAction, FetchAllCompletedAction,
    FetchAllFailedAction, SetCurrentAction
} from '../actions/music';
import { MusicState } from '../typings/state.d';

const initialState: MusicState = {
    fetching: false,
    fetched: false,
    all: []
};

type MusicAction = 
    FetchAllStartedAction | FetchAllCompletedAction |
    FetchAllFailedAction | SetCurrentAction;

export const musicReducer = (state: MusicState = initialState, action: MusicAction): MusicState => {
    switch (action.type) {
        case FETCH_ALL_MUSIC_STARTED:
            state = {...state, fetching: true};
            break;
        case FETCH_ALL_MUSIC_COMPLETED:
            state = {...state, fetching: false, fetched: true, all: action.payload};
            break;
        case FETCH_ALL_MUSIC_FAILED:
            state = {...state, fetched: false, fetching: false, error: action.payload};
            break;
        case SET_CURRENT_MUSIC:
            state = {...state, current: action.payload};
            break;
        default:
            break;
    }
    return state;
};