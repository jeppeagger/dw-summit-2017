import { Book, Movie, Music } from '../typings/models.d';

export const mapper = (item: any): (Book | Movie | Music | null) => {
    if (item.Type === 0) {
        // Book
        return ({
            id: item.Id,
            author: item.Author,
            name: item.Name,
            teaser: item.Teaser,
            description: item.Description,
            genre: item.Genre,
            image: item.Image,
            ebook: item.File,
            kind: 'BOOK'
        });
    } else if (item.Type === 1) {
        // Movie
        return ({
            id: item.Id,
            name: item.Name,
            director: item.Director,
            teaser: item.Teaser,
            description: item.Description,
            genre: item.Genre,
            image: item.Image,
            video: item.File,
            kind: 'MOVIE'
        });
    } else if (item.Type === 2) {
        // Music
        return ({
            id: item.Id,
            title: item.Title,
            artist: item.Artist,
            album: item.Album,
            genre: item.Genre,
            artwork: item.Artwork,
            audio: item.File,
            kind: 'MUSIC'
        });
    }

    return null;
};