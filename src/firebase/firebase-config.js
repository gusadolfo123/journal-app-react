import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGK3nbp_2usc4Sh3jPyZnYFBzUvET7e9o",
  authDomain: "journal-app-85034.firebaseapp.com",
  projectId: "journal-app-85034",
  storageBucket: "journal-app-85034.appspot.com",
  messagingSenderId: "903069537859",
  appId: "1:903069537859:web:e495ab3c083f9fc27de6f6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
