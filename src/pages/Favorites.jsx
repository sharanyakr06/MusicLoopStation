import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoriteSongs } from "../services/songService";
import { usePlayer } from "../context/PlayerContext";
import MusicPlayer from "../components/MusicPlayer";
import "../styles/playlistdetails.css";
import LoopPartDialog from "../components/LoopPartDialog";

function Favorites() {

  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);

  const [showLoopDialog, setShowLoopDialog] = useState(false);

  const [selectedSong, setSelectedSong] = useState(null);

  const {
    toggleSong,
    currentSong,
    isPlaying,
    startPartLoop,
  } = usePlayer();

  async function loadFavorites() {

    const data = await getFavoriteSongs();
    console.log("Favorite Songs:", data);

    setSongs(data);

  }

  useEffect(() => {

    loadFavorites();

  }, []);

  return (

    <div className="details-page">

      <div className="details-header">

        <button
          className="favorite-back-btn"
          onClick={() => navigate("/playlist")}
        >
          ← Back
        </button>

        <div className="playlist-info">

          <h1> Favorite Songs <span className="heart-icon">❤️</span> </h1>

          <p>
            {songs.length} Song{songs.length !== 1 ? "s" : ""}
          </p>

        </div>

      </div>

      <hr className="divider" />

      {songs.length === 0 ? (

        <div className="empty-song">

          <h3>No Favorite Songs</h3>

          <p>Like songs to see them here.</p>

        </div>

      ) : (

        <div className="song-list">

          {songs.map((song) => (

            <div
              key={song.id}
              className="song-card"
            >

              <div>

                <h4>{song.name.replace(".mp3", "")}</h4>

              </div>

              <div className="song-actions">

                <button
                  className="play-btn"
                  onClick={() => toggleSong(song, songs)}
                >
                  {currentSong?.id === song.id && isPlaying ? "⏸" : "▶"}
                </button>

                <button
  className="repeat-btn"
  onClick={() => {

    setSelectedSong(song);

    setShowLoopDialog(true);

  }}
>
  🎯
</button>

              </div>

            </div>

          ))}

        </div>

      )}

      {showLoopDialog && (

  <LoopPartDialog

    onClose={() => setShowLoopDialog(false)}

    onStart={async (start, end, count) => {

      await toggleSong(selectedSong, songs);

      startPartLoop(start, end, count);

      setShowLoopDialog(false);

    }}

  />

)}

      <MusicPlayer />

    </div>

  );

}

export default Favorites;