import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Add additional services that you want to use
// import 'firebase/functions';
// import 'firebase/storage';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDkpiYntswSTmr8tCAC1BReIz9FebIvG6Q",
    authDomain: "vinshazam.firebaseapp.com",
    projectId: "vinshazam",
    storageBucket: "vinshazam.appspot.com",
    messagingSenderId: "528934365986",
    appId: "1:528934365986:web:b71d873f11e28faf42537b",
    measurementId: "G-EQX762TEYJ"
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
