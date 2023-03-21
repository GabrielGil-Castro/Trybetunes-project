import { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    music: [],
    album: {},
  };

  componentDidMount() {
    this.fetchMucicAPI();
  }

  fetchMucicAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicArr = await getMusics(id);
    this.setState({
      music: musicArr,
      album: musicArr[0],
    });
  };

  render() {
    const { music, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <h2 data-testid="artist-name">{album.artistName}</h2>
        <h4 data-testid="album-name">
          {album.collectionName}
          {album.artistName}
        </h4>
        <MusicCard
          music={ music }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(
    PropTypes.shape(PropTypes.number.isRequired).isRequired,
  ).isRequired,
};

export default Album;
