import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { MusicState, AppState } from '../../typings/state.d';
import { Music } from '../../typings/models.d';
import { setCurrentMusic, fetchMusic } from '../../actions/music';

import { musicItem } from './MusicItem';
import {
    Tab, ContentBlockTitle, ContentBlock, List, Preloader
} from 'framework7-react';

interface MovieTabProps {
    fetching: boolean;
    fetched: boolean;
    music: Music[];
}

type Props = MovieTabProps & DispatchProps<MusicState>;

class MusicTab extends React.Component<Props, {}> {
    componentWillMount() {
        if (!this.props.fetching || !this.props.fetched) {
            this.props.dispatch(fetchMusic());
        }
    }

    getMusicList = () => {
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
                    {this.props.music.map(music => {
                        return musicItem(music, () => this.props.dispatch(setCurrentMusic(music)));
                    })}
                </List>
            );
        }

        return null;
    }
    
    render() {
        return (
            <Tab id="tab3">
                <ContentBlockTitle>Music</ContentBlockTitle>
                <ContentBlock inner={true}>
                    <p>This section contains music.</p>
                </ContentBlock>
                {this.getMusicList()}
            </Tab>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        music: state.music.all,
        fetching: state.movies.fetching,
        fetched: state.movies.fetched
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MusicState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicTab);