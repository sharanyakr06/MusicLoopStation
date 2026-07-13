import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function createPlaylist(userId, name) {
  await addDoc(
    collection(db, "playlists"),
    {
      userId,
      name,
      createdAt: serverTimestamp()
    }
  );
}

export async function getPlaylists(userId) {
  const q = query(
    collection(db, "playlists"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// NEW
export async function deletePlaylist(id) {
  await deleteDoc(doc(db, "playlists", id));
}

export async function getPlaylist(id) {

  const snapshot = await getDoc(
    doc(db, "playlists", id)
  );

  if (snapshot.exists()) {

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };

  }

  return null;

}