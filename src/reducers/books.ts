import {
    FETCH_ALL_BOOKS_STARTED, FETCH_ALL_BOOKS_COMPLETED,
    FETCH_ALL_BOOKS_FAILED, SET_CURRENT_BOOK,

    FetchAllStartedAction, FetchAllCompletedAction,
    FetchAllFailedAction, SetCurrentAction
} from '../actions/books';
import { BookState } from '../typings/state.d';

const initialState: BookState = {
    fetching: false,
    fetched: false,
    all: []
};

type BookAction = 
    FetchAllStartedAction | FetchAllCompletedAction |
    FetchAllFailedAction | SetCurrentAction;

export const bookReducer = (state: BookState = initialState, action: BookAction): BookState => {
    switch (action.type) {
        case FETCH_ALL_BOOKS_STARTED:
            state = {...state, fetching: true};
            break;
        case FETCH_ALL_BOOKS_COMPLETED:
            state = {...state, fetched: true, fetching: false, all: action.payload};
            break;
        case FETCH_ALL_BOOKS_FAILED:
            state = {...state, fetched: false, fetching: false, error: action.payload};
            break;
        case SET_CURRENT_BOOK:
            state = {...state, current: action.payload};
            break;
        default:
            break;
    }
    return state;
};