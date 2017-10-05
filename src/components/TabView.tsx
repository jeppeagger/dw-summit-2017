import * as React from 'react';

import {
    Navbar, Toolbar, Page, Link, ContentBlock
} from 'framework7-react';

import BookTab from './books/BookTab';
import MovieTab from './movies/MovieTab';
import MusicTab from './music/MusicTab';
import FavoritesTab from './favorites/FavoritesTab';

class TabView extends React.Component {

    render() {
        return (
            <Page navbarFixed={true} toolbarFixed={true}>
                <Navbar title={'Summit Library'}  />

                <ContentBlock tabs={true} style={{'padding': '0'}}>
                    <BookTab />
                    <MovieTab />
                    <MusicTab />
                    <FavoritesTab />
                </ContentBlock>

                <Toolbar tabbar={true} className={'nav-button-with-icon'}>
                    <Link href="#tab1" tabLink={true} active={true} text="Books" iconF7={'book'} />
                    <Link href="#tab2" tabLink={true} text="Movies" iconF7={'film'} />
                    <Link href="#tab3" tabLink={true} text="Music" iconF7={'tune'} />
                    <Link href="#tab4" tabLink={true} text="Favorites" iconF7={'favorites'} />
                </Toolbar>
            </Page>
        );
    }
}
export default TabView;