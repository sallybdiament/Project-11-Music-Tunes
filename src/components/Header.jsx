import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    headerName: '',
    isLoading: false,
  }

  componentDidMount = async () => {
    const result = await getUser();
    // console.log(result);
    this.setState({ headerName: result.name });
    this.setState({ isLoading: true });
  };

  render() {
    const { headerName, isLoading } = this.state;
    return (
      <div data-testid="header-component">
        { !isLoading
          ? <Carregando />
          : (
            <div>
              <p data-testid="header-user-name">
                { headerName}
              </p>
              <h1>Trybe Tunes</h1>
              <nav>
                <Link to="/search" data-testid="link-to-search">Search</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              </nav>
            </div>
          )}
      </div>
    );
  }
}

export default Header;
