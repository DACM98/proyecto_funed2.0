// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "course-compass-ku93m",
  appId: "1:102104745243:web:06f7db6a942a24092ebfbe",
  storageBucket: "course-compass-ku93m.firebasestorage.app",
  apiKey: "AIzaSyB8Eg7pt-eWUzEuBYTxL3JbssDXON-awQ0",
  authDomain: "course-compass-ku93m.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "102104745243"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
