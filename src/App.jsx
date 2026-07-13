import "./firebase/firebase";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Playlist from "./pages/Playlist";
import Profile from "./pages/Profile";
import PlaylistDetails from "./pages/PlaylistDetails";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/playlist"
        element={
          <ProtectedRoute>
            <Playlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <PlaylistDetails />
          </ProtectedRoute>
        }
      />

      <Route
  path="/favorites"
  element={
    <ProtectedRoute>
      <Favorites />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;