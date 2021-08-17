import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Project Lesin Aja
const firebaseConfig = {
  apiKey: "AIzaSyA9xbqzTZeuYTz-CSqdhmf4ppFHYDicXlM",
  authDomain: "lesinaja-b6947.firebaseapp.com",
  databaseURL: "https://lesinaja-b6947-default-rtdb.firebaseio.com",
  projectId: "lesinaja-b6947",
  storageBucket: "lesinaja-b6947.appspot.com",
  messagingSenderId: "373394832954",
  appId: "1:373394832954:web:5a20d2e6737c126a1dff03",
};

// Enbale initial config of firebase in appliaction
export const enableFirebaseConfig = () => {
  // Initialize Firebase
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();

  firebase.analytics();
};

// Ambil database ref untuk menggunakan method lain setelahnya
export const databaseRef = (ref: string) => {
  return firebase.database().ref(ref);
};

/**
 * Jika ref yang dicari tidak ada, return nya adalah null
 * .on untuk ambil berkali - kali
 * .once untuk ambil sekali
 */
export const getFirebaseDataOnce = async (ref: string) => {
  return databaseRef(ref)
    .once("value", (snapshot) => snapshot)
    .then((value) => value.val())
    .catch(console.error);
};

// Update data di firebase
export const updateFirebaseData = ({
  ref,
  payload,
}: {
  ref: string;
  payload: string | object;
}) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).update(payload, (error) => {
    if (error) {
      console.log("gagal");
    }
  });
};

// download file dari database
export const handleShowFile = (fileNew: string) => {
  var storageRef = firebase.storage().ref();
  return storageRef.child(fileNew).getDownloadURL();
};
