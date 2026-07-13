import { useRef, useState } from "react";
import { uploadSong } from "../services/songService";
import "../styles/upload.css";

function UploadDialog({ onClose, playlistId }) {

  const inputRef = useRef();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function chooseFiles() {
    inputRef.current.click();
  }

  function handleChange(e) {
    setFiles(Array.from(e.target.files));
  }

  async function handleUpload() {

    if (files.length === 0) {
      alert("Please choose an MP3 file.");
      return;
    }

    try {

      setUploading(true);

      await uploadSong(files[0], playlistId);

      alert("Song uploaded successfully!");

      onClose();

    } catch (error) {

      console.error("Upload Error :", error);

      alert("Upload failed.\nCheck the browser console (F12).");

    } finally {

      setUploading(false);

    }

  }

  return (

    <div className="upload-overlay">

      <div className="upload-box">

        <h2>Upload MP3 Song</h2>

        <input
          type="file"
          accept=".mp3,.mpeg,.wav,.m4a,.aac,.ogg,audio/*"
          multiple
          hidden
          ref={inputRef}
          onChange={handleChange}
        />

        <div className="upload-drop">

          <h1>🎵</h1>

          <p>Select an MP3 file</p>

          <button
            type="button"
            onClick={chooseFiles}
          >
            Browse Files
          </button>

        </div>

        <div className="selected-files">

          {files.length > 0 ? (

            files.map((file, index) => (

              <div key={index}>
                🎵 {file.name}
              </div>

            ))

          ) : (

            <p>No file selected.</p>

          )}

        </div>

        <div className="upload-buttons">

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default UploadDialog;