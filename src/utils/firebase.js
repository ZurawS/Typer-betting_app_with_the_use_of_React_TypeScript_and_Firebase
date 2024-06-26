// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_ADMIN_UIDS,
  REACT_APP_BET_PREEMPTIVE_LOCK_IN_HOURS,
} = process.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);

export const userAdminUIDS = REACT_APP_ADMIN_UIDS;
export const betPreemptiveLockInHours = REACT_APP_BET_PREEMPTIVE_LOCK_IN_HOURS;

export const matchesRef = collection(firestore, "matches");
export const betsRef = collection(firestore, "bets");
export const usersRef = collection(firestore, "users");
export const timestampsRef = collection(firestore, "timestamps");

export const getMatches = (callback) => onSnapshot(matchesRef, callback);
export const getBets = (callback) => onSnapshot(betsRef, callback);
export const getTimestamp = (callback) => onSnapshot(timestampsRef, callback);
// export const getUsers = (callback) => onSnapshot(usersRef, callback);

export const matchDocumentRef = (editedId) => doc(firestore, "matches", editedId);
export const betDocumentRef = (editedId) => doc(firestore, "bets", editedId);
export const usersDocumentRef = (editedId) => doc(firestore, "users", editedId);
export const timestampsDocumentRef = (editedId) => doc(firestore, "timestamps", editedId);
