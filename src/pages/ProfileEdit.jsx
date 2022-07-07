import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { updateUser, getUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: '',
    isLoading: false,
    isSavebuttonDisabled: true,
    redirect: false,
  }

  componentDidMount = () => {
    this.resgatandoInfoUsuarios();
  };

resgatandoInfoUsuarios = async () => {
  this.setState({ isLoading: true });
  const result = await getUser();
  this.setState({ isLoading: false });
  // console.log(result);
  this.setState({
    userName: result.name,
    userEmail: result.email,
    userDescription: result.description,
    userImg: result.image,
  });
}

  onInputChange = (event) => {
    const { target: { id, value } } = event;
    this.setState({
      [id]: value,
    });
    const { userName, userEmail, userDescription, userImg } = this.state;
    console.log(userName);
    if (userName.length > 0
      && userEmail.length > 0
      && userImg.length > 0
      && userDescription.length > 0
    ) {
      this.setState({ isSavebuttonDisabled: false });
    } else {
      this.setState({ isSavebuttonDisabled: true });
    }
  }

  handleClick = async () => {
    const {
      userName,
      userEmail,
      userDescription,
      userImg,
    } = this.state;
    const objeto = {
      name: userName,
      email: userEmail,
      image: userImg,
      description: userDescription,
    };
    await updateUser(objeto);
    this.setState({ redirect: true });
  }

  render() {
    const {
      isLoading,
      userName,
      userEmail,
      userDescription,
      userImg,
      isSavebuttonDisabled,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Profile Edit</p>
        { isLoading ? <Carregando /> : null }
        <div>
          <h1>Formulário para editar perfil:</h1>
          <form>
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
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </form>
        </div>
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default ProfileEdit;
