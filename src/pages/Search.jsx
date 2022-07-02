import React from 'react';
import AlbunsSearched from '../components/AlbunsSearched';
import Header from '../components/Header';

class Search extends React.Component {
  state ={
    searchArtist: '',
    isSaveButtonDisabled: true,
    showAlbuns: false,
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
    this.setState({ showAlbuns: true });
  }

  render() {
    const { searchArtist, isSaveButtonDisabled, showAlbuns } = this.state;
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
        { showAlbuns && <AlbunsSearched />}
      </div>
    );
  }
}

export default Search;
