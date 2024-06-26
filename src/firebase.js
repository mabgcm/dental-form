// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_joeeZ_LUhKlVEULIQOdBoekM2pMT7gM",
    authDomain: "dental-63525.firebaseapp.com",
    projectId: "dental-63525",
    storageBucket: "dental-63525.appspot.com",
    messagingSenderId: "674930677201",
    appId: "1:674930677201:web:1127100fc4389ee1513cf0",
    measurementId: "G-S7BPQD4MNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth, app, collection, addDoc, updateDoc, doc };
