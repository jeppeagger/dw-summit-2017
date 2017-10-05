import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { DispatchProps } from '../../typings/routing.d';
import { MusicState, AppState } from '../../typings/state.d';
import { Music } from '../../typings/models.d';
import { getImage, getFile } from '../../api/server';
import { addToFavorite, removeFromFavorite } from '../../actions/favorites';
import { isFavorite } from '../../utils/favorite';
import { getAudio } from '../../utils/audio';
import { Page, Navbar, ContentBlock, GridRow, GridCol, Button } from 'framework7-react';

export interface MusicPageProps {
    music: Music;
    isFavorite: boolean;
}

interface State {
    playing: boolean;
    audio?: HTMLAudioElement;
}

type Props = MusicPageProps & DispatchProps<MusicState>;

class MusicPage extends React.Component<Props, State> {
    state: State = {
        playing: false
    };

    favoriteHandler = () => {
        if (this.props.isFavorite) {
            this.props.dispatch(removeFromFavorite(this.props.music));
        } else {
            this.props.dispatch(addToFavorite(this.props.music));
        }
    }

    toggleAudio = () => {
        if (this.state.playing && this.state.audio) {
            this.state.audio.pause();
            this.state.audio.currentTime = 0;
            this.setState({playing: false});
        } else {
            const audio = this.state.audio
                ? this.state.audio
                : getAudio(getFile(this.props.music.audio));
            audio.play();
            this.setState({playing: true, audio});
        }
    }

    render() {
        if (this.props.music) {
            return (
                <Page>
                    <Navbar backLink={'Back'} title={this.props.music.title} sliding={true} />
                    <ContentBlock inner={true}>
                        <GridRow>
                            <GridCol width={'25'}>
                                <img src={getImage(this.props.music.artwork, 85)} />
                            </GridCol>
                            <GridCol width={'55'}>
                                <strong>{this.props.music.title}</strong><br />
                                <i>{this.props.music.genre}</i><br />
                                {this.props.music.artist}<br />
                                {this.props.music.album}
                            </GridCol>
                            <GridCol width={'20'}>
                                <Button onClick={this.toggleAudio}>
                                    {this.state.playing ? 'Stop' : 'Listen'}
                                </Button><br />
                                <Button
                                    iconF7={this.props.isFavorite ? 'star_fill' : 'star'}
                                    style={{'border': '0'}}
                                    onClick={this.favoriteHandler}
                                />
                        </GridCol>
                        </GridRow>
                    </ContentBlock>
                </Page>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        music: state.music.current,
        isFavorite: isFavorite(state.music.current, state.favorites.all)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MusicState>) => {
    return {
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);