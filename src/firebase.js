// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getFirestore } from "firebase/firestore";
 

const firebaseConfig = {
  apiKey: "AIzaSyAVx6INtX0wIWTxy9WgS7MfcLGcRruNZqo",
  authDomain: "clone-5e19f.firebaseapp.com",
  projectId: "clone-5e19f",
  storageBucket: "clone-5e19f.appspot.com",
  messagingSenderId: "604451602302",
  appId: "1:604451602302:web:d98afa889ceb0df168fd2f",
  measurementId: "G-8L9MCZ3XMC",
};

const app= initializeApp(firebaseConfig);
// const db = app.firestore();
const db = getFirestore(app);
const auth = getAuth();


export { db, auth };
