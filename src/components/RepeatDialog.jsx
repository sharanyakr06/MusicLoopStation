import { useState } from "react";
import "../styles/repeatdialog.css";

function RepeatDialog({ onClose, onStart }) {

  const [count, setCount] = useState(2);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    if (count > 2) {
      setCount((prev) => prev - 1);
    }
  }

  return (

    <div className="modal-overlay">

      <div className="repeat-modal">

        <h2>Repeat Song</h2>

        <p>How many times should this song repeat?</p>

        <div className="counter">

          <button onClick={decrease}>−</button>

          <span>{count}</span>

          <button onClick={increase}>+</button>

        </div>

        <div className="repeat-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="start-btn"
            onClick={() => onStart(count)}
          >
            Start
          </button>

        </div>

      </div>

    </div>

  );

}

export default RepeatDialog;