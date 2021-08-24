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

// Jika ref yang dicari tidak ada, return nya adalah null
// .on untuk ambil berkali - kali
// .once untuk ambil sekali
export const getFirebaseDataOnce = (ref: string) => {
  return databaseRef(ref)
    .once("value", (snapshot) => snapshot)
    .then((value) => value.val())
    .catch(console.error);
};

// menambahkan data ke database firebase
export const addFirebaseData = ({
  ref,
  payload,
  isNoKey,
}: {
  ref: string;
  payload: any;
  isNoKey?: string;
}) => {
  const rtDatabase = firebase.database();

  if (isNoKey) {
    return rtDatabase.ref(`${ref}`).set(payload, (error) => {
      if (error) {
        console.log("gagal");
      }
    });
  }
  const newKey = firebase.database().ref(ref).push().key;

  return rtDatabase.ref(`${ref}/${newKey}`).set(payload, (error) => {
    if (error) {
      console.log("gagal");
    }
  });
};

// Update data di firebase
export const updateFirebaseData = (ref: string, payload: string | object) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).update(payload, (error) => {
    if (error) {
      console.log("gagal");
    }
  });
};

// delete data di firebase
export const deleteFirebaseData = (ref: string) => {
  const rtDatabase = firebase.database();
  try {
    return rtDatabase.ref(ref).remove();
  } catch (message) {
    return console.error(message);
  }
};

// download file dari database
export const handleShowFile = (fileNew: string) => {
  var storageRef = firebase.storage().ref();
  return storageRef.child(fileNew).getDownloadURL();
};

// login dengan Email firebase
export const handleLoginEmail = async (email: string, password: string) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    var user: any = userCredential.user;
    const getData = await getFirebaseDataOnce(`user/${user.uid}/roles`);
    // console.log(getData);
    return { success: true, role: getData };
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return { success: false };
  }
};

//Login dengan Google firebase
export const handleLoginGoogleFirebase = async () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    var user: any = userCredential.user;
    const getData = await getFirebaseDataOnce(`user/${user.uid}/roles`);
    // console.log(getData);
    return { success: true, role: getData };
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return { success: true };
  }
};

export const handleLogout = async () => {
  return firebase.auth().signOut();
};

export { firebase };
