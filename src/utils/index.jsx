import {
  enableFirebaseConfig,
  getFirebaseDataOnce,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
  handleRegister,
  handleLogin,
  handleResetPassword,
  firebase,
} from "./firebaseConfig";
import { DBKEY } from "./variables";

export {
  DBKEY,
  firebase,
  handleResetPassword,
  handleLogin,
  handleRegister,
  enableFirebaseConfig,
  getFirebaseDataOnce,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
};
