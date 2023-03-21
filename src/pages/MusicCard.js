import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
  };

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
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
};
