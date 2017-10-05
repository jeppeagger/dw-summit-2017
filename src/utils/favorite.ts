import { Book, Movie, Music, Favorite } from '../typings/models.d';

export const isFavorite = (item: Book | Movie | Music | undefined, favorites: Favorite[]): boolean => {
    if (item) {
        return favorites.filter(f => f.item.id === item.id).length > 0;
    }
    return false;
};