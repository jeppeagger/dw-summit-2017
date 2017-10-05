import * as React from 'react';
import { Movie } from '../../typings/models.d';
import { getImage } from '../../api/server';
import { ListItem } from 'framework7-react';

export const movieItem = (movie: Movie, setCurrentMovie: () => void) => {
    return (
        <ListItem 
            key={'movie-' + movie.id}
            title={movie.name}
            subtitle={movie.genre}
            text={movie.teaser.substr(0, 50)}
            media={`<img src='${getImage(movie.image, 80)}' />`}
            onClick={setCurrentMovie}
            link={`/movie/${movie.id}/`}
        />
    );
};