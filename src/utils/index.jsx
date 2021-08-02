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
  handleUploadFile,
  handleShowFile,
} from "./firebaseConfig";
import { DBKEY } from "./variables";

export {
  DBKEY,
  firebase,
  handleShowFile,
  handleUploadFile,
  handleResetPassword,
  handleLogin,
  handleRegister,
  enableFirebaseConfig,
  getFirebaseDataOnce,
  addFirebaseData,
  updateFirebaseData,
  deleteFirebaseData,
};
