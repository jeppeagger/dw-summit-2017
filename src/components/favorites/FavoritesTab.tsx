import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { FavoriteState, AppState } from '../../typings/state.d';
import { Book, Movie, Music, Favorite } from '../../typings/models.d';
import { fetchFavorites } from '../../actions/favorites';
import { setCurrentBook } from '../../actions/books';
import { setCurrentMovie } from '../../actions/movies';
import { setCurrentMusic } from '../../actions/music';
import { bookItem } from '../books/BookItem';
import { movieItem } from '../movies/MovieItem';
import { musicItem } from '../music/MusicItem';

import {
    Tab, ContentBlockTitle, ContentBlock, List, Preloader, ListItem
} from 'framework7-react';

interface FavoritesTabProps {
    fetching: boolean;
    fetched: boolean;
    favorites: Favorite[];
}

type Props = FavoritesTabProps & DispatchProps<FavoriteState>;
type FavoriteType = Book | Movie | Music;

class FavoritesTab extends React.Component<Props, {}> {
    componentWillMount() {
        if (!this.props.fetching || !this.props.fetched) {
            this.props.dispatch(fetchFavorites());
        }
    }

    getFavoritesList = () => {
        if (this.props.fetching) {
            return (
                <ContentBlock>
                    <Preloader />
                </ContentBlock>
            );
        }

        if (this.props.fetched) {
            const groups = this.props.favorites.reduce((pv: {books: Book[], movies: Movie[], music: Music[]}, cv) => {
                const item: FavoriteType = cv.item;

                if (item.kind === 'BOOK') {
                    pv.books.push(item);
                } else if (item.kind === 'MOVIE') {
                    pv.movies.push(item);
                } else if (item.kind === 'MUSIC') {
                    pv.music.push(item);
                }

                return pv;
            }, {books: [], movies: [], music: []});

            return (
                <List mediaList={true}>
                    {groups.books.length > 0 ? <ListItem groupTitle={true} title={'Books'} /> : null}
                    {groups.books.map(book => bookItem(book, () => this.props.dispatch(setCurrentBook(book))))}
                    {groups.movies.length > 0 ? <ListItem groupTitle={true} title={'Movies'} /> : null}
                    {groups.movies.map(movie => movieItem(movie, () => this.props.dispatch(setCurrentMovie(movie))))}
                    {groups.music.length > 0 ? <ListItem groupTitle={true} title={'Music'} /> : null}
                    {groups.music.map(music => musicItem(music, () => this.props.dispatch(setCurrentMusic(music))))}
                </List>
            );
        }

        return null;
    }
    
    render() {
        return (
            <Tab id="tab4">
                <ContentBlockTitle>Favorites</ContentBlockTitle>
                <ContentBlock inner={true}>
                    <p>This section contains all your favorites.</p>
                </ContentBlock>
                {this.getFavoritesList()}
            </Tab>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        favorites: state.favorites.all,
        fetching: state.favorites.fetching,
        fetched: state.favorites.fetched
    };
};

const mapDispatchToProps = (dispatch: Dispatch<FavoriteState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesTab);