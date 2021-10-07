// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK9bPhy6C8fvTjVK9oaYx9Jm3PieO5eOs",
  authDomain: "upload-image-cba21.firebaseapp.com",
  databaseURL: "gs://upload-image-cba21.appspot.com",
  projectId: "upload-image-cba21",
  storageBucket: "upload-image-cba21.appspot.com",
  messagingSenderId: "644827419291",
  appId: "1:644827419291:web:3a999bcfc378aab3a0ec3e",
  measurementId: "G-3XGJHC9L0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
