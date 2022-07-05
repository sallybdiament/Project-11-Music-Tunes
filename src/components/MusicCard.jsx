import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    favorite: false,
    isLoading: false,
  }

  onCheckboxChange = async () => {
    this.setState({ isLoading: true });
    const { objeto } = this.props;
    console.log(objeto.favorita);
    await addSong(objeto);
    this.setState({ isLoading: false });
    this.setState({
      favorite: true,
    });
  }

  componentDidMount = () => {
    const { objeto } = this.props;
    if (objeto.favorita) {
      this.setState({ favorite: true });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, isLoading } = this.state;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // favorita: PropTypes.bool.isRequired,
  objeto: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    favorita: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MusicCard;
