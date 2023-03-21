import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const minLength = 2;

class Search extends Component {
  state = {
    artist: '',
    albuns: [],
    loading: false,
    newArtist: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  fetchSearchAPI = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
      newArtist: artist,
    });
    const arrAlbum = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      albuns: arrAlbum,
      loading: false,
    });
  };

  render() {
    const { artist, loading, albuns, newArtist } = this.state;
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
            type="button"
            data-testid="search-artist-button"
            disabled={ !isValid }
            onClick={ this.fetchSearchAPI }
          >
            Pesquisar
          </button>
          {loading && <Loading />}
        </form>
        <p>
          Resultado de álbuns de:
          {' '}
          {newArtist}
        </p>
        {albuns.length > 0
          ? (
            <div>
              {
                albuns.map((album) => (
                  <div key={ album.collectionId }>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      key={ album.collectionId }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <p>{album.collectionName}</p>
                      <img src={ album.artworkUrl100 } alt={ album.collectionId } />
                    </Link>
                  </div>
                ))
              }
            </div>)
          : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
