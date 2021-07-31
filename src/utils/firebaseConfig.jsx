import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/auth";
import { Swal } from "@components";

const firebaseConfig = {
  // * Project Coba RTDB coba2 punya Andi
  // apiKey: "AIzaSyDzitqGAIf5ZZL7sIq_jrZ4avgxoSoL2Z0",
  // authDomain: "cobartdb.firebaseapp.com",
  // projectId: "cobartdb",
  // storageBucket: "cobartdb.appspot.com",
  // messagingSenderId: "76531160",
  // appId: "1:76531160:web:d6017d6e0a09f6d0fd1ead",
  // measurementId: "G-PL3529W8EH",
  // databaseURL:
  //   "https://cobartdb-default-rtdb.asia-southeast1.firebasedatabase.app/",

  // * Project Lesin Aja
  apiKey: "AIzaSyA9xbqzTZeuYTz-CSqdhmf4ppFHYDicXlM",
  authDomain: "lesinaja-b6947.firebaseapp.com",
  databaseURL: "https://lesinaja-b6947-default-rtdb.firebaseio.com",
  projectId: "lesinaja-b6947",
  storageBucket: "lesinaja-b6947.appspot.com",
  messagingSenderId: "373394832954",
  appId: "1:373394832954:web:5a20d2e6737c126a1dff03",
};

// * Enbale intial config of firebase in appliaction
const enableFirebaseConfig = () => {
  // Initialize Firebase
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();

  firebase.analytics();
};

const getFirebaseDataOnce = async ({ ref, limit }) => {
  // Jika ref yang dicari tidak ada, return nya adalah null
  // .on untuk ambil berkali - kali
  // .once untuk ambil sekali
  const rtDatabase = firebase.database();

  if (limit) {
    return rtDatabase
      .ref(ref)
      .limitToFirst(limit)
      .once("value", (snapshot) => snapshot)
      .then((value) => value.val())
      .catch(console.error);
  }

  return rtDatabase
    .ref(ref)
    .once("value", (snapshot) => snapshot)
    .then((value) => value.val())
    .catch(console.error);
};

const addFirebaseData = ({ ref, payload, isNoKey }) => {
  const rtDatabase = firebase.database();

  if (isNoKey) {
    return rtDatabase.ref(`${ref}`).set(payload, (error) => {
      if (error) {
        Swal.fire({
          icon: "error",
          text: "Input data gagal",
          confirmButtonColor: "#FBBF24",
        });
      }
    });
  }
  const newKey = firebase.database().ref(ref).push().key;

  return rtDatabase.ref(`${ref}/${newKey}`).set(payload, (error) => {
    if (error) {
      Swal.fire({
        icon: "error",
        text: "Input data gagal",
        confirmButtonColor: "#FBBF24",
      });
    }
  });
};

const updateFirebaseData = ({ ref, payload }) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).update(payload, (error) => {
    if (error) {
      Swal.fire({
        icon: "error",
        text: "Update data gagal",
        confirmButtonColor: "#FBBF24",
      });
    }
  });
};

const deleteFirebaseData = ({ ref }) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).remove();
};

const handleRegister = async (email, password, role) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    var user = userCredential.user;

    addFirebaseData({
      ref: `user/${user.uid}/roles`,
      payload: { [role]: true },
      isNoKey: true,
    });

    const getData = await getFirebaseDataOnce({
      ref: `user/${user.uid}/roles`,
    });
    return { success: true, role: getData };
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return { success: false };
  }
};

const handleLogin = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    var user = userCredential.user;
    const getData = await getFirebaseDataOnce({
      ref: `user/${user.uid}/roles`,
    });
    // console.log(getData);
    return { success: true, role: getData };
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return { success: false };
  }
};

export {
  handleLogin,
  handleRegister,
  enableFirebaseConfig,
  getFirebaseDataOnce,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
};
