// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";   
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9RkZFAwtJfZUXYvXZBb2S4GYVSzOkpjE",
  authDomain: "location-a26be.firebaseapp.com",
  databaseURL: "https://location-a26be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "location-a26be",
  storageBucket: "location-a26be.appspot.com",
  messagingSenderId: "275944322136",
  appId: "1:275944322136:web:70f14965096c7dff1e462d",
  measurementId: "G-2W7W0Z25Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);    

//initizile database
export const db = getDatabase(app);