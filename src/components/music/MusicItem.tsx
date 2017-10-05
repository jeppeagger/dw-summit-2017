import * as React from 'react';
import { Music } from '../../typings/models.d';
import { getImage } from '../../api/server';
import { ListItem } from 'framework7-react';

export const musicItem = (music: Music, setCurrentMusic: () => void) => {
    return (
        <ListItem 
            key={'music-' + music.id}
            title={music.title}
            subtitle={music.genre}
            text={`${music.artist}<br />${music.album}`}
            media={`<img src='${getImage(music.artwork, 80)}' />`}
            onClick={setCurrentMusic}
            link={`/music/${music.id}/`}
        />
    );
};