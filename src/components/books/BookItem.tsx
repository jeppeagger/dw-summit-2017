import * as React from 'react';
import { Book } from '../../typings/models.d';
import { getImage } from '../../api/server';
import { ListItem } from 'framework7-react';

export const bookItem = (book: Book, setCurrentBook: () => void) => {
    return (
        <ListItem 
            key={'book-' + book.id}
            title={book.name}
            subtitle={book.author}
            text={book.teaser.substr(0, 50)}
            media={`<img src='${getImage(book.image, 80)}' />`}
            onClick={setCurrentBook}
            link={`/book/${book.id}/`}
        />            
    );
};