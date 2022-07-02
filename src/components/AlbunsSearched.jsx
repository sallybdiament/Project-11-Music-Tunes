import React from 'react';
import Carregando from '../pages/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';

class AlbunsSearched extends React.Component {
    state = {
    // Fiquei na dúvida se inicio como string vazia ou como array vazio?
      resultsAlbuns: '',
    }

    // Será que aqui precisa de componentDidMount? Ou didUpate?
    showAlbuns = async () => {
      const { searchArtist } = this.state;
      this.setState({ isLoading: true });
      const result = await searchAlbumsAPI(searchArtist);
      this.setState({
        searchArtist: '',
        // Me parece que não estou inserindo corretamente os dados no array:
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
            // Fazer outro if aqui que se o resultsAlbuns.length < 0, retorna que nenhum album foi encontrado.
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
