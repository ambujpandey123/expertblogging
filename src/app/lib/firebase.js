// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "expertblogging.firebaseapp.com",
  projectId: "expertblogging",
  storageBucket: "expertblogging.firebasestorage.app",
  messagingSenderId:  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

 
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
 
export const db = getFirestore();