import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { MovieState, AppState } from '../../typings/state.d';
import { Movie } from '../../typings/models.d';
import { setCurrentMovie, fetchMovies } from '../../actions/movies';

import { movieItem } from './MovieItem';
import {
    Tab, ContentBlockTitle, ContentBlock, List, Preloader
} from 'framework7-react';

interface MovieTabProps {
    fetching: boolean;
    fetched: boolean;
    movies: Movie[];
}

type Props = MovieTabProps & DispatchProps<MovieState>;

class MovieTab extends React.Component<Props, {}> {
    componentWillMount() {
        if (!this.props.fetching || !this.props.fetched) {
            this.props.dispatch(fetchMovies());
        }
    }

    getBookList = () => {
        if (this.props.fetching) {
            return (
                <ContentBlock>
                    <Preloader />
                </ContentBlock>
            );
        }

        if (this.props.fetched) {
            return (
                <List mediaList={true}>
                    {this.props.movies.map(movie => {
                        return movieItem(movie, () => this.props.dispatch(setCurrentMovie(movie)));
                    })}
                </List>
            );
        }

        return null;
    }
    
    render() {
        return (
            <Tab id="tab2">
                <ContentBlockTitle>Movies</ContentBlockTitle>
                <ContentBlock inner={true}>
                    <p>This section contains movies.</p>
                </ContentBlock>
                {this.getBookList()}
            </Tab>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        movies: state.movies.all,
        fetching: state.movies.fetching,
        fetched: state.movies.fetched
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MovieState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieTab);