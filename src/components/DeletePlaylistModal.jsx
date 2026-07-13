import "../styles/modal.css";

function DeletePlaylistModal({ playlistName, onCancel, onDelete }) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Delete Playlist</h2>

        <p className="delete-text">
          Are you sure you want to delete
          <strong> "{playlistName}"</strong>?
        </p>

        <p className="delete-warning">
          This action cannot be undone.
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeletePlaylistModal;