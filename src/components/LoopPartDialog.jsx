import { useState } from "react";

function LoopPartDialog({ onClose, onStart }) {

  const [start, setStart] = useState("");

  const [end, setEnd] = useState("");

  const [count, setCount] = useState(2);

  function toSeconds(time) {

    const parts = time.split(":");

    if (parts.length !== 2) return 0;

    const minutes = Number(parts[0]);

    const seconds = Number(parts[1]);

    return minutes * 60 + seconds;

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>🎯 Loop Part of Song</h2>

        <p>Enter time in MM:SS format</p>

        <input
          type="text"
          placeholder="00:12"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          type="text"
          placeholder="01:20"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <input
  type="number"
  min="2"
  placeholder="Repeat Count"
  value={count}
  onChange={(e)=>setCount(Number(e.target.value))}
/>

        <button
          onClick={() =>
            onStart(
              toSeconds(start),
              toSeconds(end),
              count 
            )
          }
        >
          Start Loop
        </button>

        <button onClick={onClose}>
          Cancel
        </button>

      </div>

    </div>

  );

}

export default LoopPartDialog;