import firebase from "firebase/app";
import "firebase/analytics";

// * Project Coba RTDB coba2 punya Andi
const firebaseConfig = {
  apiKey: "AIzaSyDzitqGAIf5ZZL7sIq_jrZ4avgxoSoL2Z0",
  authDomain: "cobartdb.firebaseapp.com",
  projectId: "cobartdb",
  storageBucket: "cobartdb.appspot.com",
  messagingSenderId: "76531160",
  appId: "1:76531160:web:d6017d6e0a09f6d0fd1ead",
  measurementId: "G-PL3529W8EH",
  databaseURL:
    "https://cobartdb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Get a reference to the database service
const rtDatabase = firebase.database();

const enableFirebaseConfig = () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};

export { enableFirebaseConfig, rtDatabase };
