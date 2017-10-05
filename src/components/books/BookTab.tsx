import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { BookState, AppState } from '../../typings/state.d';
import { Book } from '../../typings/models.d';
import { setCurrentBook, fetchBooks } from '../../actions/books';

import { bookItem } from './BookItem';
import {
    Tab, ContentBlockTitle, ContentBlock, List, Preloader
} from 'framework7-react';

interface BookTabProps {
    fetching: boolean;
    fetched: boolean;
    books: Book[];
}

type Props = BookTabProps & DispatchProps<BookState>;

class BookTab extends React.Component<Props, {}> {
    componentWillMount() {
        if (!this.props.fetching || !this.props.fetched) {
            this.props.dispatch(fetchBooks());
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
                    {this.props.books.map(book => {
                        return bookItem(book, () => this.props.dispatch(setCurrentBook(book)));
                    })}
                </List>
            );
        }

        return null;
    }
    
    render() {
        return (
            <Tab id="tab1" active={true}>
                <ContentBlockTitle>Books</ContentBlockTitle>
                <ContentBlock inner={true}>
                    <p>This section contains books.</p>
                </ContentBlock>
                {this.getBookList()}
            </Tab>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        books: state.books.all,
        fetching: state.books.fetching,
        fetched: state.books.fetched
    };
};

const mapDispatchToProps = (dispatch: Dispatch<BookState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookTab);