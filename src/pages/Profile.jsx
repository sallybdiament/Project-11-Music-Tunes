import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
    isLoading: true,
  }

  componentDidMount = async () => {
    const result = await getUser();
    console.log(result);
    this.setState({
      userName: result.name,
      userEmail: result.email,
      userDescription: result.description,
      userImg: result.image,
    });
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, userName, userEmail, userDescription, userImg } = this.state;
    return (
      <div>
        <Header />
        { isLoading
          ? <Carregando />
          : (
            <div>
              <p>{ userName }</p>
              <p>{ userEmail }</p>
              <p>{ userDescription }</p>
              <img data-testid="profile-image" src={ userImg } alt={ userName } />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
