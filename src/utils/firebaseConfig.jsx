import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

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
// Get a reference to the database service
let rtDatabase;

// * Enbale intial config of firebase in appliaction
const enableFirebaseConfig = () => {
  // Initialize Firebase
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();

  rtDatabase = firebase.database();
  firebase.analytics();

  // * Create
  // rtDatabase.ref("kakek/ortu").set({
  //   cucu2: "cucuuu2",
  // });
};

// * Get data
const getFirebaseData = ({ ref, onGetData }) => {
  rtDatabase.ref(ref).on("value", (snapshot) => {
    const data = snapshot.val();
    onGetData(data);
  });
};

export { enableFirebaseConfig, getFirebaseData };
