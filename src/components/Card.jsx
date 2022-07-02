import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { cardInfo } = this.props;
    const { collectionName, artistName, artworkUrl100 } = cardInfo;
    return (
      <article>
        <img alt={ collectionName } src={ artworkUrl100 } />
        <h3>{collectionName}</h3>
        <h2>{artistName}</h2>
      </article>
    );
  }
}

Card.propTypes = {
  cardInfo: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
  }).isRequired,
};

export default Card;
