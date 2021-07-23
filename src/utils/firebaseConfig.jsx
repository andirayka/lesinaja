import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

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

const enableFirebaseConfig = () => {
  // Initialize Firebase
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();

  firebase.analytics();

  // Get a reference to the database service
  const rtDatabase = firebase.database();
  // * Read
  // rtDatabase.ref("parent1").on("value", (data) => {
  //   console.log(data.val());
  // });

  // * Create
  rtDatabase.ref("kakek/ortu").set({
    cucu2: "cucuuu2",
  });
};

export { enableFirebaseConfig };