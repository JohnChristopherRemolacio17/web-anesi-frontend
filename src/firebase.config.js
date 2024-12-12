// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";  // Add Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrZDU557TBgOcL3R0ItEFv99gkSh8zoX4",
  authDomain: "posdb-16945.firebaseapp.com",
  projectId: "posdb-16945",
  storageBucket: "posdb-16945.firebasestorage.app",
  messagingSenderId: "389923056103",
  appId: "1:389923056103:web:780dbb35b77aae4a91f542",
  measurementId: "G-KQ0SDDN4YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, getDocs };
