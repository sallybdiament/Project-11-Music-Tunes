import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    isLoading: false,
    removeFavorite: false,
  }

  onCheckboxChange = async () => {
    this.setState({ isLoading: true });
    const { favorite } = this.state;
    const { objeto, removeFromFavorite } = this.props;
    if (removeFromFavorite) {
      await removeSong(objeto);
      this.setState({ removeFavorite: true });
    } else if (!favorite) {
      // console.log(objeto.favorita);
      await addSong(objeto);
      this.setState({ isLoading: false });
      this.setState({
        favorite: true,
      });
    } else {
      await removeSong(objeto);
      this.setState({ isLoading: false });
      this.setState({
        favorite: false,
      });
    }
  }

  componentDidMount = () => {
    const { objeto } = this.props;
    if (objeto.favorita) {
      this.setState({ favorite: true });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading,
      removeFavorite } = this.state;
    console.log(this.props);
    return (
      <>
        <p>Favoritas</p>
        { removeFavorite
          ? null
          : (
            <article>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favorite"
                  id="favorite"
                  checked={ favorite }
                  onChange={ this.onCheckboxChange }
                />
              </label>
              { isLoading && <Carregando /> }
            </article>
          )}
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  // favorita: PropTypes.bool,
  objeto: PropTypes.shape({
    trackId: PropTypes.number,
    favorita: PropTypes.bool,
  }),
  removeFromFavorite: PropTypes.string,
}.isRequired;

export default MusicCard;
