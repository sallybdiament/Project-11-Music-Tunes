import React from 'react';
import Carregando from '../pages/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';

class AlbunsSearched extends React.Component {
    state = {
      resultsAlbuns: '',
    }

    showAlbuns = async () => {
      const { searchArtist } = this.state;
      this.setState({ isLoading: true });
      const result = await searchAlbumsAPI(searchArtist);
      this.setState({
        searchArtist: '',
        resultsAlbuns: result,
        isLoading: false,
      });
    }

    render() {
      const { isLoading, resultsAlbuns } = this.state;
      return (
        <div>
          { isLoading
            ? <Carregando />
            : (
              <div>
                <p>
                  Resultado de álbuns de:
                  { resultsAlbuns[0].artistName }
                </p>
                {
                  resultsAlbuns.map((album) => (<Card
                    key={ album.artistId }
                    cardInfo={ album }
                  />))
                }
              </div>
            )}
        </div>
      );
    }
}

export default AlbunsSearched;
