import { Action, Dispatch } from 'redux';
import { Book } from '../../typings/models.d';
import { BookState } from '../../typings/state.d';
import { getBooks } from '../../api/server';
import { mapper } from '../../utils/mapper';

// Action Types for Discriminated Unions
export const FETCH_ALL_BOOKS_STARTED = 'FETCH_ALL_BOOKS_STARTED';
export const FETCH_ALL_BOOKS_COMPLETED = 'FETCH_ALL_BOOKS_COMPLETED';
export const FETCH_ALL_BOOKS_FAILED = 'FETCH_ALL_BOOKS_FAILED';
export const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK';

// Actions
export interface FetchAllStartedAction extends Action {
    type: 'FETCH_ALL_BOOKS_STARTED';
}

export interface FetchAllCompletedAction extends Action {
    type: 'FETCH_ALL_BOOKS_COMPLETED';
    payload: Book[];
}

export interface FetchAllFailedAction extends Action {
    type: 'FETCH_ALL_BOOKS_FAILED';
    payload: Error;
}

export interface SetCurrentAction extends Action {
    type: 'SET_CURRENT_BOOK';
    payload: Book;
}

// Action Creators
const startedFetchAllCreator = (): FetchAllStartedAction =>
    ({ type: FETCH_ALL_BOOKS_STARTED });
const completedFetchAllCreator = (books: Book[]): FetchAllCompletedAction =>
    ({ type: FETCH_ALL_BOOKS_COMPLETED, payload: books });
const failedFetchAllCreator = (err: Error): FetchAllFailedAction =>
    ({ type: FETCH_ALL_BOOKS_FAILED, payload: err });
const setCurrentCreator = (book: Book): SetCurrentAction =>
    ({ type: SET_CURRENT_BOOK, payload: book });

// Action Dispatchers - API calls go here inside these
export const fetchBooks = () => (dispatch: Dispatch<BookState>) => {
    dispatch(startedFetchAllCreator());

    getBooks()
        .then(res => res.json())
        .then(result => result.map((x: any) => mapper(x)))
        .then(books => dispatch(completedFetchAllCreator(books)))
        .catch(e => dispatch(failedFetchAllCreator(e)));
};

export const setCurrentBook = (book: Book) => (dispatch: Dispatch<BookState>) =>
    dispatch(setCurrentCreator(book));