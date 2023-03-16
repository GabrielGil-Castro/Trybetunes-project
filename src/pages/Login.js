import { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    userName: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { userName, value } = target;
    this.setState({
      [userName]: value,
    });
  };

  fetchCreateUser = async () => {
    const { userName, loading } = this.state;
    this.setState({
      loading: true,
    });
    const data = await createUser({ name: userName });
    if (data === 'OK') {
      this.setState({
        loading: false,
      });
    }
    if (loading) return <Loading />;
  };

  render() {
    const { userName } = this.state;
    const maxLength = 3;
    const isBtnVallid = userName > maxLength;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <label htmlFor="name">
            Insira seu nome aqui:
            <input
              type="text"
              name="name"
              id="name"
              value={ userName }
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ !isBtnVallid }
            onClick={ () => this.fetchCreateUser() }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
