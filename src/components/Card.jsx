import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { name, imgUrl, collectionName, collectionId } = this.props;
    return (
      <article>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img alt={ name } src={ imgUrl } />
          <h2>{name}</h2>
          <p>{collectionId}</p>
          <p>{collectionName}</p>
        </Link>
      </article>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
