import { Component } from 'react';
import Header from '../components/Header';

const minLength = 2;

class Search extends Component {
  state = {
    artist: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const isValid = artist.length >= minLength;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              type="text"
              name="artist"
              id="artist"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ !isValid }
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
