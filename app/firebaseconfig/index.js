// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//getAuth for authentication, getFirestore for database, getStorage to store any uploaded file/image
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaB6Qh_egTXWcBi1VGEwAM0wdUeIMjW7E",
  authDomain: "userauthnewsreading-project.firebaseapp.com",
  projectId: "userauthnewsreading-project",
  storageBucket: "userauthnewsreading-project.appspot.com",
  messagingSenderId: "655138231225",
  appId: "1:655138231225:web:e9f788f70c00e13b971c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db = getFirestore(app)