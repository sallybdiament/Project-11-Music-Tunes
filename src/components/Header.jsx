import React from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    headerName: '',
    isLoading: false,
  }

  componentDidMount = async () => {
    const result = await getUser();
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
            </div>
          )}
      </div>
    );
  }
}

export default Header;
