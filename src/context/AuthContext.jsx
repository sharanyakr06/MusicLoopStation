import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function register(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Save user information to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    return userCredential;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      setCurrentUser(user);

      setLoading(false);

    });

    return unsubscribe;

  }, []);

  const value = {

    currentUser,

    register,

    login,

    logout

  };

  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>

  );

}