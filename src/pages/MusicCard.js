import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
  };

  /* async componentDidMount() {
    this.setState({
      loading: true,
    });
    const favoriteSong = await getFavoriteSongs();
    this.setState({
      favoriteList: favoriteSong,
      loading: false,
    });
  }
 */
  handleChangeFavorite = async (songObj) => {
    this.setState({
      loading: true,
    });
    await addSong(songObj);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { music } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading && <Loading />}
        {
          music.slice(1).map((song) => (
            <div key={ song.trackId }>
              <h3>{song.trackName}</h3>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>

              <label>
                Favorita
                <input
                  name="favorite-song"
                  type="checkbox"
                  data-testid={ `checkbox-music-${song.trackId}` }
                  onChange={ () => this.handleChangeFavorite(song) }
                />
              </label>
            </div>))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artistViewUrl: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionCensoredName: PropTypes.string.isRequired,
    collectionExplicitness: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    collectionViewUrl: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    discCount: PropTypes.number.isRequired,
    discNumber: PropTypes.number.isRequired,
    isStreamable: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    primaryGenreName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCensoredName: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
    trackExplicitness: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    trackNumber: PropTypes.number.isRequired,
    trackPrice: PropTypes.number.isRequired,
    trackTimeMillis: PropTypes.number.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    wrapperType: PropTypes.string.isRequired,
  }).isRequired)
    .isRequired,
};
