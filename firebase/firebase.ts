// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU5F-olnLFJk4EXFn6EsgfOHt35MBVE2M",
  authDomain: "nextj-todo-app.firebaseapp.com",
  projectId: "nextj-todo-app",
  storageBucket: "nextj-todo-app.appspot.com",
  messagingSenderId: "442934601551",
  appId: "1:442934601551:web:bba70eb8ce3035b294873a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
