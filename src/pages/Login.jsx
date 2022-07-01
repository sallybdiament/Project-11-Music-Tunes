import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
    state ={
      inputName: '',
      isSaveButtonDisabled: true,
      isLoading: false,
      isLoggedIn: false,
    }

validate = () => {
  const { inputName } = this.state;
  if (inputName.length > 2) {
    this.setState({ isSaveButtonDisabled: false });
  } else {
    this.setState({ isSaveButtonDisabled: true });
  }
}

    onInputChange = (event) => {
      const { target } = event;
      this.setState({
        [target.name]: target.value,
      }, () => this.validate());
    }

   handleClick = async () => {
     const { inputName } = this.state;
     this.setState({ isLoading: true });
     await createUser({ name: inputName });
     this.setState({ isLoggedIn: true });
   }

   render() {
     const { isSaveButtonDisabled, inputName, isLoading, isLoggedIn } = this.state;
     return (
       <div data-testid="page-login">
         { isLoading
           ? <Carregando />
           : (
             <div>
               <label htmlFor="inputName">
                 Insira seu nome de usuário:
                 <input
                   type="text"
                   data-testid="login-name-input"
                   name="inputName"
                   id="inputName"
                   value={ inputName }
                   onChange={ this.onInputChange }
                 />
               </label>
               <button
                 type="submit"
                 data-testid="login-submit-button"
                 disabled={ isSaveButtonDisabled }
                 onClick={ this.handleClick }
               >
                 Entrar
               </button>
             </div>
           )}
         { isLoggedIn && <Redirect to="/search" /> }
       </div>
     );
   }
}

export default Login;
