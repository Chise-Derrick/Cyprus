import firebase from "firebase/app";
import "firebase/firestore"; // If using Firebase database
import "firebase/storage"; // If using Firebase storage
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBIApLw8CAA63Ues_LObJ4xUyZ039MvuhA",
  authDomain: "inst-stelios.firebaseapp.com",
  databaseURL: "https://inst-stelios.firebaseio.com",
  projectId: "inst-stelios",
  storageBucket: "inst-stelios.appspot.com",
  messagingSenderId: "964965823187",
  appId: "1:964965823187:web:b4acdb3986e6f8cae39a26",
  measurementId: "G-FN9FVCB9P1",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
