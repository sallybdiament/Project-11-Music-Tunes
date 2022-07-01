import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
    state ={
      inputName: '',
      isSaveButtonDisabled: true,
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
     await createUser({ name: inputName });
   }

   render() {
     const { isSaveButtonDisabled, inputName } = this.state;
     return (
       <div data-testid="page-login">
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
     );
   }
}

export default Login;
