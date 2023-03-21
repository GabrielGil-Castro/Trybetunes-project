import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    userName: '',
    loading: false,
    data: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchCreateUser = async () => {
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    const data = await createUser({ name: userName });
    if (data === 'OK') {
      this.setState({
        loading: false,
        data,
      });
    }
  };

  render() {
    const { userName, data, loading } = this.state;
    const maxLength = 3;
    const isBtnVallid = userName.length >= maxLength;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <label htmlFor="name">
            Insira seu nome aqui:
            <input
              type="text"
              name="userName"
              id="name"
              value={ userName }
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !isBtnVallid }
            onClick={ this.fetchCreateUser }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
          {loading && <Loading />}
          { data === 'OK' && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

export default Login;
