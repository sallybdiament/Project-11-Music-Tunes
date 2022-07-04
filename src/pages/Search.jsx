import React from 'react';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

class Search extends React.Component {
  state ={
    searchArtist: '',
    isSaveButtonDisabled: true,
    isLoading: false,
    resultsAlbuns: [],
  }

validate = () => {
  const { searchArtist } = this.state;
  if (searchArtist.length > 1) {
    this.setState({ isSaveButtonDisabled: false });
  } else {
    this.setState({ isSaveButtonDisabled: true });
  }
}

  onInputChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    }, () => this.validate());
  }

  handleShowAlbuns = () => {
    const { searchArtist } = this.state;
    this.setState((prev) => ({
      isLoading: true,
      copySearchArtist: prev.searchArtist,
    }), async () => {
      const result = await searchAlbumsAPI(searchArtist);
      this.setState({
        resultsAlbuns: result,
      }, () => {
        this.setState({
          isLoading: false,
          searchArtist: '',
        });
      });
    });
  };

  render() {
    const {
      searchArtist,
      isSaveButtonDisabled,
      isLoading,
      resultsAlbuns,
      copySearchArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label htmlFor="searchArtist">
            Digite o nome da banda ou artista:
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchArtist"
              id="searchArtist"
              value={ searchArtist }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isSaveButtonDisabled }
            onClick={ this.handleShowAlbuns }
          >
            Pesquisar
          </button>
        </div>
        { isLoading && <Carregando />}
        { !!resultsAlbuns.length
        && (
          <>
            <p>
              {`Resultado de álbuns de: ${copySearchArtist}`}
            </p>
            { resultsAlbuns.map((album) => (
              <div key={ album.collectionId }>
                <Card
                  name={ album.artistName }
                  imgUrl={ album.artworkUrl100 }
                  collectionName={ album.collectionName }
                  collectionId={ album.collectionId }
                />
              </div>
            )) }
          </>
        )}
        { resultsAlbuns.length === 0
        && (
          <p> Nenhum álbum foi encontrado </p>
        )}
      </div>
    );
  }
}

export default Search;
