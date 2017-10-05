import BookPage from '../components/books/BookPage';
import MoviePage from '../components/movies/MoviePage';
import MusicPage from '../components/music/MusicPage';

export const routes = [
    {
        path: '/book/:id',
        component: BookPage
    },
    {
        path: '/movie/:id',
        component: MoviePage
    },
    {
        path: '/music/:id',
        component: MusicPage
    }
];