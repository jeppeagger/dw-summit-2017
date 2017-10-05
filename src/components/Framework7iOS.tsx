import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { BookState, MovieState, MusicState, AppState } from '../typings/state.d';

import { Framework7App, Statusbar, Views, View, Pages } from 'framework7-react';

import 'framework7-react/dist/umd/css/framework7.ios.min.css';
import 'framework7-react/dist/umd/css/framework7.ios.colors.min.css';
import 'framework7-icons/css/framework7-icons.css';
import '../css/ios.css';

import { routes } from '../routes';

import TabView from './TabView';

interface TabViewProps {
    bookState: BookState;
    movieState: MovieState;
    musicState: MusicState;
}

interface DispatchProps {
    dispatch: Dispatch<AppState>;
}

type Props = TabViewProps & DispatchProps;

class Framework7iOS extends React.Component<Props, {}> {
    render() {
        return (
            <Framework7App
                themeType={'ios'}
                routes={routes}
            >
                <Statusbar />
                <Views navbarThrough={true}>
                    <View main={true}>
                        <Pages>
                            <TabView />
                        </Pages>
                    </View>
                </Views>
            </Framework7App>
        );
    }
}

const mapStateToProps = (state: AppState): TabViewProps => {
    return {
        bookState: state.books,
        movieState: state.movies,
        musicState: state.music
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Framework7iOS);