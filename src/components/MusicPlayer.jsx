import { usePlayer } from "../context/PlayerContext";
import "../styles/player.css";

function MusicPlayer() {

  const {
    currentSong,
    isPlaying,
    toggleSong,
    nextSong,
    previousSong,
    currentTime,
    duration,
    seek,
    volume,
    changeVolume,
    formatTime,
    repeatPlaylist,
    toggleRepeatPlaylist,
  } = usePlayer();

  if (!currentSong) return null;

  return (

    <div className="music-player">

      <div className="player-song">

        <h4>
          {currentSong.name.replace(".mp3", "")}
        </h4>

        <p>MP3 Audio</p>

      </div>

      <div className="player-controls">

        <button onClick={previousSong}>
          ⏮
        </button>

        <button
          className="play-main"
          onClick={() => toggleSong(currentSong)}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button onClick={nextSong}>
          ⏭
        </button>

        {/* NEW Repeat Playlist Button */}

        <button
          onClick={toggleRepeatPlaylist}
          title="Repeat Playlist"
        >
          {repeatPlaylist ? "🔀" : "➡️"}
        </button>

      </div>

      <div className="progress-area">

        <span>
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => seek(e.target.value)}
        />

        <span>
          {formatTime(duration)}
        </span>

      </div>

        <div className="volume-area">
            🔊

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    onChange={(e) => changeVolume(e.target.value)}
  />

  </div>

    </div>

  );

}

export default MusicPlayer;