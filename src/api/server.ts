import {
    booksApi, favoritesApi, moviesApi, musicApi, imageApi,
    host, favoritesAddApi, favoritesRemoveApi
} from '../config/endpoints';

export const getBooks = () => {
    return api(booksApi);
};

export const getMovies = () => {
    return api(moviesApi);
};

export const getMusic = () => {
    return api(musicApi);
};

export const getFavorites = () => {
    return api(favoritesApi);
};

export const addFavorite = (id: number) => {
    return api(`${favoritesAddApi}/${id}`);
};

export const removeFavorite = (id: number) => {
    return api(`${favoritesRemoveApi}/${id}`);
};

export const getImage = (image: string, width: number): string => {
    return `${imageApi}?image=${image}&width=${width}`;
};

export const getFile = (path: string): string => {
    return `${host}${path}`;
};

const api = (input: RequestInfo, options?: RequestInit): Promise<Response> => {
    if (!options) {
        const headers = new Headers();
        headers.append('Accept', 'application/json');

        options = {
            method: 'GET',
            headers: headers
        };
    }

    return fetch(input, options);
};
