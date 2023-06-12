import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Add additional services that you want to use
// import 'firebase/functions';
// import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey://REPLACE WITH API KEY,
  authDomain: //REPLACE WITH AUTH DOMAIN,
  projectId: //REPLACE WITH PROJECT ID,
  storageBucket: //REPLACE WITH STORAGE BUCKET,
  messagingSenderId: //REPLACE WITH MESSAGE SENDER ID,
  appId:// REPLACE WITH APP ID,
  measurementId:// REPLACE WITH MEASUREMENT ID,
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };