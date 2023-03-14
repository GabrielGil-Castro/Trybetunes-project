import { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.fetchGetUser();
  }

  async fetchGetUser() {
    const data = await getUser();
    this.setState({
      userName: data.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2>}
      </header>
    );
  }
}

export default Header;
