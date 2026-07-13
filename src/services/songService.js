import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const CLOUD_NAME = "ljxb2yot";
const UPLOAD_PRESET = "loopstation_upload";

export async function uploadSong(file, playlistId) {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  await addDoc(collection(db, "songs"), {
    playlistId,
    name: file.name,
    url: data.secure_url,
    publicId: data.public_id,
    duration: data.duration || 0,
    favorite: false,
    createdAt: serverTimestamp(),
  });

  return data;
}

export async function getSongs(playlistId) {

  const q = query(
    collection(db, "songs"),
    where("playlistId", "==", playlistId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}

export async function getSongCount(playlistId) {

  const q = query(
    collection(db, "songs"),
    where("playlistId", "==", playlistId)
  );

  const snapshot = await getDocs(q);

  return snapshot.size;

}

export async function toggleFavorite(songId, value) {

  await updateDoc(
    doc(db, "songs", songId),
    {
      favorite: value
    }
  );

}

export async function deleteSong(songId) {

  await deleteDoc(
    doc(db, "songs", songId)
  );

}

export async function getFavoriteSongs() {

  const q = query(
    collection(db, "songs"),
    where("favorite", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}