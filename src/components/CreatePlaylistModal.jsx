import { useState } from "react";
import "../styles/modal.css";

function CreatePlaylistModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate(name);

    setName("");

    onClose();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Create Playlist</h2>

        <form onSubmit={handleSubmit}>

          <label>Playlist Name</label>

          <input
            type="text"
            placeholder="Enter playlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Create
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreatePlaylistModal;