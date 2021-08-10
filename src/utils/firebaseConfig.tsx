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

// Ambil nama data jika diketahui idnya
export const getUserNameById = async ({ uid }: { uid: string }) => {
  //
};
