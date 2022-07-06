import React from 'react';
import Header from '../components/Header';
import { createUser, getUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
    isLoading: true,
    isSavebuttonDisabled: true,
  }

  componentDidMount = async () => {
    await createUser({
      email: 'test@test.com',
      description: 'teste',
      image: 'teste',
    });
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

  validate = () => {
    const { userName, userEmail, userDescription, userImg } = this.state;
    if (userName && userEmail && userDescription && userImg) {
      this.setState = { isSavebuttonDisabled: false };
    }
  }

  onInputChange = (event) => {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    }, () => this.validate());
  }

  render() {
    const {
      isLoading,
      userName,
      userEmail,
      userDescription,
      userImg,
      isSavebuttonDisabled,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Profile Edit</p>
        { isLoading
          ? <Carregando />
          : (
            <div>
              <p>{ userName }</p>
              <p>{ userEmail }</p>
              <p>{ userDescription }</p>
              <img data-testid="profile-image" src={ userImg } alt={ userName } />
              <h1>Formulário para editar perfil:</h1>
              <label htmlFor="userName">
                Alterar nome de usuário:
                <input
                  type="text"
                  data-testid="edit-input-name"
                  name="userName"
                  id="userName"
                  value={ userName }
                  // placeholder={ userName }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="userEmail">
                Altere seu email:
                <input
                  type="email"
                  data-testid="edit-input-email"
                  name="userEmail"
                  id="userEmail"
                  // placeholder={ userEmail }
                  value={ userEmail }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="userDescription">
                Altere sua descrição:
                <input
                  type="text"
                  data-testid="edit-input-description"
                  name="userDescription"
                  id="userDescription"
                  value={ userDescription }
                  // placeholder={ userDescription }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="userImg">
                Altere sua foto:
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="userImg"
                  id="userImg"
                  value={ userImg }
                  // placeholder={ userImg }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ isSavebuttonDisabled }
                // onClick={ this.handleClick }
              >
                Salvar
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
