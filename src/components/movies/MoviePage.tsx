import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { MovieState, AppState } from '../../typings/state.d';
import { Movie } from '../../typings/models.d';
import { getImage, getFile } from '../../api/server';
import { addToFavorite, removeFromFavorite } from '../../actions/favorites';
import { isFavorite } from '../../utils/favorite';
import { Page, Navbar, ContentBlock, ContentBlockTitle, GridRow, GridCol, Button } from 'framework7-react';

export interface MoviePageProps {
    movie: Movie;
    isFavorite: boolean;
}

type Props = MoviePageProps & DispatchProps<MovieState>;

class MoviePage extends React.Component<Props, {}> {
    favoriteHandler = () => {
        if (this.props.isFavorite) {
            this.props.dispatch(removeFromFavorite(this.props.movie));
        } else {
            this.props.dispatch(addToFavorite(this.props.movie));
        }
    }

    render() {
        if (this.props.movie) {
            return (
                <Page>
                    <Navbar backLink={'Back'} title={this.props.movie.name} sliding={true} />
                    <ContentBlock inner={true}>
                        <GridRow>
                            <GridCol width={'25'}>
                                <img src={getImage(this.props.movie.image, 85)} />
                            </GridCol>
                            <GridCol width={'55'}>
                                <strong>{this.props.movie.name}</strong><br />
                                <i>{this.props.movie.genre}</i><br />
                                {this.props.movie.director}
                            </GridCol>
                            <GridCol width={'20'}>
                                <Button href={getFile(this.props.movie.video)}>Watch</Button><br />
                                <Button
                                    iconF7={this.props.isFavorite ? 'star_fill' : 'star'}
                                    style={{'border': '0'}}
                                    onClick={this.favoriteHandler}
                                />
                        </GridCol>
                        </GridRow>
                    </ContentBlock>
                    <ContentBlockTitle>Description</ContentBlockTitle>
                    <ContentBlock inner={true}>
                        <p>
                            {this.props.movie.description}
                        </p>
                    </ContentBlock>
                </Page>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        movie: state.movies.current,
        isFavorite: isFavorite(state.movies.current, state.favorites.all)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MovieState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);