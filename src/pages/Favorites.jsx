import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();
    const favoriteSongsComFavTrue = favorites.map((music) => ({
      ...music, favorita: 'true',
    }));
    this.setState({ favoriteSongs: favoriteSongsComFavTrue,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        { isLoading ? <Carregando />
          : (
            favoriteSongs.map((music) => (
              <div key={ music.trackId }>
                <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  objeto={ music }
                />
              </div>
            ))
          )}
      </div>
    );
  }
}

export default Favorites;
