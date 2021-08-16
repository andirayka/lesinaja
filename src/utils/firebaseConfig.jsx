import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

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

// * Enbale initial config of firebase in appliaction
const enableFirebaseConfig = () => {
  // Initialize Firebase
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  else firebase.app();

  firebase.analytics();
};

// Jika ref yang dicari tidak ada, return nya adalah null
// .on untuk ambil berkali - kali
// .once untuk ambil sekali
const getFirebaseDataOnce = async ({ ref, limit }) => {
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

/**
 * @typedef {Object}
 * @property {String} ref - ref untuk query
 * @property {Array}  childKey - child key dari root ref
 * @property {String=} type - diisi jika childkey bertipe array of objects
 */
const getFirebaseDataByChild = async ({
  ref,
  childKey = [],
  type = undefined,
}) => {
  const rtDatabase = firebase.database();

  if (type) {
    const query = childKey.map(async (key) => {
      try {
        const value = await rtDatabase.ref(ref).child(key[type]).once("value");
        return value;
      } catch (message) {
        return console.error(message);
      }
    });

    return { snapshotPromise: query, type: type };
  } else {
    console.log(childKey);
    const query = childKey.map(async (key) => {
      try {
        const value = await rtDatabase.ref(ref).child(key).once("value");
        return value;
      } catch (message) {
        return console.error(message);
      }
    });

    return query;
  }
};

const addFirebaseData = ({ ref, payload, isNoKey }) => {
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

const updateFirebaseData = ({ ref, payload }) => {
  const rtDatabase = firebase.database();
  return rtDatabase.ref(ref).update(payload, (error) => {
    if (error) {
      console.log("gagal");
    }
  });
};

const deleteFirebaseData = async ({ ref }) => {
  const rtDatabase = firebase.database();
  try {
    return rtDatabase.ref(ref).remove();
  } catch (message) {
    return console.error(message);
  }
};

//register firebase
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

// login firebase
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

const handleLogout = async () => {
  return firebase.auth().signOut();
  // const user = firebase.auth().currentUser;
  // console.log(user);
};

// status autentikasi
const handleStatusAutentikasi = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(uid);
    } else {
      console.log("anda masih belum login");
    }
  });
};

// Lupa password
const handleResetPassword = async (email) => {
  try {
    const userCredential = await firebase.auth().sendPasswordResetEmail(email);
    var user = userCredential;
    console.log(user);
    return { success: true };
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    return { success: false };
  }
};

// Upload File
const handleUploadFile = (files, fileNew) => {
  var storageRef = firebase.storage().ref();
  return storageRef
    .child(fileNew)
    .put(files)
    .then(() => {
      console.log("Proses Upload Berhasil Om");
    });
};

// Show file
const handleShowFile = (fileNew) => {
  var storageRef = firebase.storage().ref();
  return storageRef.child(fileNew).getDownloadURL();
};

export {
  handleLogout,
  handleStatusAutentikasi,
  handleShowFile,
  handleUploadFile,
  firebase,
  handleResetPassword,
  handleLogin,
  handleRegister,
  enableFirebaseConfig,
  getFirebaseDataOnce,
  getFirebaseDataByChild,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
};
