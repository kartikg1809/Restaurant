// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "restaurant-67e9e.firebaseapp.com",
  projectId: "restaurant-67e9e",
  storageBucket: "restaurant-67e9e.appspot.com",
  messagingSenderId: "417338829211",
  appId: "1:417338829211:web:78f3e467a95ddb9776d93e",
  measurementId: "G-462EPC0KNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };