import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
} from "../services/playlistService";

import CreatePlaylistModal  from "../components/CreatePlaylistModal";

import DeletePlaylistModal from "../components/DeletePlaylistModal";

import { getSongCount } from "../services/songService";

import "../styles/playlist.css";

function Playlist() {
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");


  const [showModal, setShowModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  async function load() {
    const data = await getPlaylists(currentUser.uid);
    const playlistsWithCount = await Promise.all(

    data.map(async (playlist) => {

      const count = await getSongCount(playlist.id);

      return {
        ...playlist,
        songCount: count,
      };

    })

  );
    setPlaylists(playlistsWithCount);
  }

  useEffect(() => {
    if (currentUser) {
      load();
    }
  }, [currentUser]);


  async function handleCreate(name) {
    await createPlaylist(currentUser.uid, name);

    setShowModal(false);

    load();
  }


  function openDeleteModal(playlist){

    setSelectedPlaylist(playlist);

    setShowDeleteModal(true);

  }

  async function handleDelete() {

  if(!selectedPlaylist) return;

    await deletePlaylist(selectedPlaylist.id);

    setShowDeleteModal(false);

    setSelectedPlaylist(null);

  load();

 }


  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const filteredPlaylists = useMemo(() => {
    let data = [...playlists];

    data = data.filter((playlist) =>
      playlist.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "az") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "oldest") {
      data.reverse();
    }

    return data;
  }, [playlists, search, sort]);

  return (
    <div className="playlist-page">

      <div className="sidebar">

        <div>

          <div className="logo">
            🎵 LoopStation
          </div>

          <div className="menu">

            <Link to="/favorites">
              ❤ Favorites
            </Link>

            <Link to="/profile">
              👤 Profile
            </Link>

          </div>

        </div>

        <button
          className="logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="content">

        <div className="top">

          <div>

            <h1>My Playlists</h1>

            <p className="playlist-count">
              {playlists.length} Playlist{playlists.length !== 1 && "s"}
            </p>

          </div>

          <button
            className="create-btn"
            onClick={() => setShowModal(true)}
          >
            + Create Playlist
          </button>

        </div>

        <div className="toolbar">

          <input
            type="text"
            placeholder="🔍 Search Playlist..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="sort-box"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
          </select>

        </div>

        {filteredPlaylists.length === 0 ? (

          <div className="empty-state">

            <h2>🎵</h2>

            <h3>No playlists yet</h3>

            <p>Create your first playlist</p>

            <button
              className="create-btn"
              onClick={() => setShowModal(true)}
            >
              Create Playlist
            </button>

          </div>

        ) : (

          <div className="grid">

            {filteredPlaylists.map((playlist) => (

              <div
                key={playlist.id}
                className="card"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >

                 <button
    className="delete-playlist"
    onClick={(e) => {
      e.stopPropagation();
      openDeleteModal(playlist);
    }}
  >
    🗑
  </button>

                <h2>{playlist.name}</h2>

                <p>
                  {playlist.songCount} Song
  {playlist.songCount !== 1 ? "s" : ""}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {showModal && (
        <CreatePlaylistModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}


      {showDeleteModal && 
      <DeletePlaylistModal

playlistName={selectedPlaylist.name}

onCancel={()=>{

setShowDeleteModal(false);

setSelectedPlaylist(null);

}}

onDelete={handleDelete}

/>
}

    </div>
  );
}

export default Playlist;