import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { AppState } from '../typings/state.d';
import { bookReducer } from '../reducers/books';
import { movieReducer } from '../reducers/movies';
import { musicReducer } from '../reducers/music';
import { favoriteReducer } from '../reducers/favorites';

const reducers = combineReducers<AppState>({
    books: bookReducer,
    movies: movieReducer,
    music: musicReducer,
    favorites: favoriteReducer
});

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducers, middleware);