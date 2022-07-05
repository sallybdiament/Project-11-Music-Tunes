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
    const objeto = {
      test: 'testes',
    };
    await addSong(objeto);
    this.setState({ isLoading: false });
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
            value={ favorite }
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
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
