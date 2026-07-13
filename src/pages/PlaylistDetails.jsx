import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UploadDialog from "../components/UploadDialog";
import { getPlaylist } from "../services/playlistService";
import { getSongs, toggleFavorite, deleteSong } from "../services/songService";
import "../styles/playlistdetails.css";
import { usePlayer } from "../context/PlayerContext";
import MusicPlayer from "../components/MusicPlayer";
import RepeatDialog from "../components/RepeatDialog";

function PlaylistDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [showUpload, setShowUpload] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  const [showRepeat, setShowRepeat] = useState(false);

  const [selectedSong, setSelectedSong] = useState(null);

  const { toggleSong, currentSong, isPlaying, startRepeat } = usePlayer();

  const [search, setSearch] = useState(""); 

  async function loadSongs() {

    const songData = await getSongs(id);

    setSongs(songData);

  }

  useEffect(() => {

    async function loadPlaylist() {

      const playlistData = await getPlaylist(id);

      setPlaylist(playlistData);

      await loadSongs();

    }

    loadPlaylist();

  }, [id]);

  async function handleFavorite(song) {

    await toggleFavorite(song.id, !song.favorite);

    await loadSongs();

  }

  function handleRepeat(song) {

  setSelectedSong(song);

  setShowRepeat(true);

}

  async function handleDelete(song) {

  const ok = window.confirm(
    `Delete "${song.name}" ?`
  );

  if (!ok) return;

  await deleteSong(song.id);

  await loadSongs();

}

const filteredSongs = songs.filter(song =>
  song.name.toLowerCase().includes(search.toLowerCase())
);

  return (

    <div className="details-page">

        <button
          className="playlist-back-btn"
          onClick={() => navigate("/playlist")}
        >
          ← Back
        </button>

        <div className="details-header">

        <div className="playlist-info">

          <h1>
            {playlist ? playlist.name : "Loading..."}
          </h1>

          <p>
            {songs.length} Song{songs.length !== 1 ? "s" : ""}
          </p>

        </div>

        <button
          className="upload-btn"
          onClick={() => setShowUpload(true)}
        >
          + Upload MP3
        </button>

      </div>

      <hr className="divider" />

      <div className="search-box">

  <input
    type="text"
    placeholder="Search songs..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

      {filteredSongs.length === 0 ? (

        <div className="empty-song">

          {songs.length === 0 ? (
  <>
    <h3>No songs in this playlist.</h3>
    <p>Upload your first MP3 to get started.</p>
  </>
) : (
  <>
    <h3>No matching songs found.</h3>
    <p>Try another song name.</p>
  </>
)}

        </div>

      ) : (

        <div className="song-list">

          {filteredSongs.map((song) => (

            <div
              key={song.id}
              className="song-card"
            >

              <div>

                <h4>{song.name.replace(".mp3", "")}</h4> 

              </div>

              <div className="song-actions">

                <button
    className="delete-btn"
    onClick={(e)=>{

      e.stopPropagation();

      handleDelete(song);

    }}
  >
    🗑
  </button>

                <button
                  className="fav-btn"
                  onClick={(e) => {

                    e.stopPropagation();

                    handleFavorite(song);

                  }}
                >
                  {song.favorite ? "❤️" : "🤍"}
                </button>

                <button
                  className="play-btn"
                  onClick={(e) => {

                    e.stopPropagation();

                    toggleSong(song, songs);

                  }}
                >
                  {currentSong?.id === song.id && isPlaying ? "⏸" : "▶"}
                </button>

                <button
    className="repeat-btn"
    onClick={(e) => {

      e.stopPropagation();

      handleRepeat(song);

    }}
  >
    🔄
  </button> 

              </div>

            </div>

          ))}

        </div>

      )}

      {showUpload && (

        <UploadDialog
          playlistId={id}
          onClose={async () => {

            setShowUpload(false);

            await loadSongs();

          }}
        />

      )}

      {showRepeat && (

  <RepeatDialog

    onClose={() => setShowRepeat(false)}

    onStart={(count) => {

      startRepeat(count);

      toggleSong(selectedSong, songs);

      setShowRepeat(false);

    }}

  />

)}

      <MusicPlayer />

    </div>

  );

}

export default PlaylistDetails;