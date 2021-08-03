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
  handleStatusAutentikasi,
} from "./firebaseConfig";
import { DBKEY } from "./variables";

export {
  DBKEY,
  firebase,
  handleStatusAutentikasi,
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
