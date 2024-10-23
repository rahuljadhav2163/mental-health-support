import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfWQn0ShhhpcH5aUea-HCviaxaIjL0GUg",
  authDomain: "mental-health-support-97c86.firebaseapp.com",
  projectId: "mental-health-support-97c86",
  storageBucket: "mental-health-support-97c86.appspot.com",
  messagingSenderId: "251883850294",
  appId: "1:251883850294:web:2edd0d42de6324dd492697",
  measurementId: "G-ZSDGJ5KQ5G"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;