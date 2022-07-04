import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musicsInfo: [],
    musics: [],
    isLoading: true,
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const idAlbum = match.params.id;
    const result = await getMusics(idAlbum);
    console.log(result[0].wrapperType);
    const musicsInfo = result[0];
    const musics = result.filter((music, i) => i > 0);
    console.log(musics);
    console.log(musicsInfo);
    this.setState({ musicsInfo, musics, isLoading: false });
  }

  render() {
    const { musics, isLoading, musicsInfo } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Carregando />
          : (
            <>
              <h1 data-testid="artist-name">
                { musicsInfo.artistName }
              </h1>
              <p data-testid="album-name">
                { musicsInfo.collectionName }
              </p>
              {/* { musics.filter((music) => (music.wrapperType === 'track')).map((music) => (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                  />
                </div>
              )) } */}
              { musics.map((music) => (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                  />
                </div>
              )) }
            </>
          ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
