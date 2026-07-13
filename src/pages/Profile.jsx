import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

function Profile() {

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {

    await logout();

    navigate("/login");

  }

  return (

    <div className="profile-page">

      <button
        className="back-btn"
        onClick={() => navigate("/playlist")}
      >
        ← Back
      </button>

      <div className="profile-card">

        <div className="profile-icon">
          🎧
        </div>

        <h1>My Profile</h1>

        <div className="email-card">

          <h4>📧 Email</h4>

          <p>{currentUser?.email}</p>

        </div>

        <div className="thank-text">

          <p>
            Thank you for being a part of <strong>LoopStation</strong>.
          </p>

          <p>
            Enjoy your favorite music and create amazing playlists! 🎶
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );

}

export default Profile;