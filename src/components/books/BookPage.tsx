import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { BookState, AppState } from '../../typings/state.d';
import { Book } from '../../typings/models.d';
import { getImage, getFile } from '../../api/server';
import { addToFavorite, removeFromFavorite } from '../../actions/favorites';
import { isFavorite } from '../../utils/favorite';
import { Page, Navbar, ContentBlock, ContentBlockTitle, GridRow, GridCol, Button } from 'framework7-react';

export interface BookPageProps {
    book: Book;
    isFavorite: boolean;
}

type Props = BookPageProps & DispatchProps<BookState>;

class BookPage extends React.Component<Props, {}> {
    favoriteHandler = () => {
        if (this.props.isFavorite) {
            this.props.dispatch(removeFromFavorite(this.props.book));
        } else {
            this.props.dispatch(addToFavorite(this.props.book));
        }
    }

    render() {
        if (this.props.book) {
            return (
                <Page>
                    <Navbar backLink={'Back'} title={this.props.book.name} sliding={true} />
                    <ContentBlock inner={true}>
                        <GridRow>
                            <GridCol width={'25'}>
                                <img src={getImage(this.props.book.image, 85)} />
                            </GridCol>
                            <GridCol width={'55'}>
                                <strong>{this.props.book.name}</strong><br />
                                <i>{this.props.book.genre}</i><br />
                                {this.props.book.author}
                            </GridCol>
                            <GridCol width={'20'}>
                                <Button href={getFile(this.props.book.ebook)}>Read</Button><br />
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
                            {this.props.book.description}
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
        book: state.books.current,
        isFavorite: isFavorite(state.books.current, state.favorites.all)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<BookState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);