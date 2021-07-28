import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/auth";

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

// * Get data
const getFirebaseMasterData = ({ onGetData, ref }) => {
  const mainRef = firebase.database().ref();

  mainRef
    .child(ref)
    .once("value")
    .then((snapshot) => {
      const rawData = snapshot.val();
      onGetData(rawData);
    });
};

const getFirebaseDataOnce = ({ ref }) => {
  const rtDatabase = firebase.database();

  // .on untuk ambil berkali - kali
  return rtDatabase
    .ref(ref)
    .once("value", (snapshot) => snapshot)
    .then((value) => value.val());
};

const addFirebaseData = ({ ref, payload }) => {
  const rtDatabase = firebase.database();
  const newKey = firebase.database().ref(ref).push().key;

  return rtDatabase.ref(`${ref}/${newKey}`).set(payload, (error) => {
    if (error) {
      console.log("Data could not be added." + error);
    } else {
      console.log("Data added successfully.");
    }
  });
};

const updateFirebaseData = ({ ref, payload }) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).update(payload, (error) => {
    if (error) {
      console.log("Data could not be updated." + error);
    } else {
      console.log("Data updated successfully.");
    }
  });
};

const deleteFirebaseData = ({ ref }) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).remove();
};

const handleRegister = (email,password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

export {
  handleRegister,
  enableFirebaseConfig,
  getFirebaseMasterData,
  getFirebaseDataOnce,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
};
