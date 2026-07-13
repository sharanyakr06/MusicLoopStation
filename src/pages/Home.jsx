import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function handleGetStarted() {
    if (currentUser) {
      navigate("/playlist");
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      {/* Header */}

      <header className="home-header">

        <div className="home-logo">
          🎵 LoopStation
        </div>

        <div className="home-links">

          <button
            className="home-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="home-register"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>

      </header>

      {/* Hero */}

      <div className="hero">

        <h1>
          Listen Forever.
          <br />
          No Ads.
          <br />
          Just Your Music.
        </h1>

        <p>
          Upload your own MP3 songs, create playlists, and enjoy
          uninterrupted music with powerful loop modes.
        </p>

        <button
          className="start-btn"
          onClick={handleGetStarted}
        >
          Get Started
        </button>

      </div>
    </>
  );
}

export default Home;